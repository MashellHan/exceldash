#!/usr/bin/env python3
"""
Embed an Office Add-in manifest into an existing .xlsx so the add-in
ships with the file (no sideload, no dev mode).
"""

import sys, uuid, shutil, tempfile, zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

CONTENT_TYPE = "application/vnd.ms-office.taskpanemanifest+xml"
REL_TYPE     = "http://schemas.microsoft.com/office/2014/relationships/taskpanemanifest"

def next_customxml_id(zipf):
    nums = [int(p.stem[4:]) for p in map(Path, zipf.namelist())
            if p.parts[0]=="customXml" and p.stem.startswith("item")]
    return max(nums, default=0) + 1

def patch_content_types(content_data, partname):
    tree = ET.fromstring(content_data)
    ns = {"ct":"http://schemas.openxmlformats.org/package/2006/content-types"}
    # 已经有就跳过
    for ov in tree.findall("ct:Override", ns):
        if ov.attrib["PartName"] == partname:
            break
    else:
        ET.SubElement(tree, "{%s}Override"%ns["ct"],
                      PartName=partname, ContentType=CONTENT_TYPE)
    return ET.tostring(tree, encoding="utf-8", xml_declaration=True)

def patch_workbook_rels(rels_data, rel_id, partname):
    ns = {"r":"http://schemas.openxmlformats.org/package/2006/relationships"}
    tree = ET.fromstring(rels_data)
    ET.SubElement(tree, "{%s}Relationship"%ns["r"],
                  Id=rel_id, Type=REL_TYPE, Target=partname)
    return ET.tostring(tree, encoding="utf-8", xml_declaration=True)

def embed(workbook, manifest):
    tmp = Path(tempfile.mktemp(suffix=".xlsx"))
    shutil.copy(workbook, tmp)               # work on a temp copy

    # Read all existing files from the original zip
    files_to_write = {}
    
    with zipfile.ZipFile(tmp, "r") as read_zip:
        for file_info in read_zip.infolist():
            if not file_info.is_dir():
                files_to_write[file_info.filename] = read_zip.read(file_info.filename)
        
        item_id  = next_customxml_id(read_zip)
        item_xml = f"/customXml/item{item_id}.xml"
        rel_id   = f"rId{uuid.uuid4().hex[:8]}"

    # Add the manifest
    files_to_write[item_xml.lstrip("/")] = Path(manifest).read_bytes()

    # Update [Content_Types].xml
    if "[Content_Types].xml" in files_to_write:
        files_to_write["[Content_Types].xml"] = patch_content_types(
            files_to_write["[Content_Types].xml"], item_xml
        )

    # Update xl/_rels/workbook.xml.rels
    rels_path = "xl/_rels/workbook.xml.rels"
    if rels_path in files_to_write:
        files_to_write[rels_path] = patch_workbook_rels(
            files_to_write[rels_path], rel_id, item_xml
        )

    # Write all files to a new zip file
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as write_zip:
        for filename, data in files_to_write.items():
            write_zip.writestr(filename, data)

    out = Path(workbook).with_stem(Path(workbook).stem + "+addin")
    shutil.move(tmp, out)
    print(f"✅  Done!  Output: {out}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("Usage: embed_addin.py <workbook.xlsx> <manifest.xml>")
    embed(Path(sys.argv[1]), Path(sys.argv[2]))
