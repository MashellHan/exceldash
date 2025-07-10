import os
import subprocess
import sys
import tempfile

def create_csharp_script_taskpane(target_url="https://mashellhan.github.io/exceldash/dashboard_example.html"):
    """Create a C# script to embed a Taskpane add-in using OpenXML SDK."""
    return f"""
using System;
using System.Linq;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Office2013.WebExtension;
using DocumentFormat.OpenXml.Office2013.WebExtentionPane;
using DocumentFormat.OpenXml.CustomProperties;
using We = DocumentFormat.OpenXml.Office2013.WebExtension;
using Wetp = DocumentFormat.OpenXml.Office2013.WebExtentionPane;
using DocumentFormat.OpenXml;

class Program {{
    static void Main(string[] args) {{
        if (args.Length < 1) {{ Console.WriteLine("Please provide the Excel file path"); return; }}
        
        try {{
            using (var doc = SpreadsheetDocument.Open(args[0], true)) {{
                // Add Excel custom property for HTML to read
                var customPart = doc.CustomFilePropertiesPart ?? doc.AddCustomFilePropertiesPart();
                if (customPart.Properties == null) customPart.Properties = new Properties();
                
                var existing = customPart.Properties.Elements<CustomDocumentProperty>()
                    .FirstOrDefault(p => p.Name?.Value == "WebExtensionProperty");
                existing?.Remove();
                
                var props = customPart.Properties.Elements<CustomDocumentProperty>();
                var propId = props.Any() ? props.Max(p => p.PropertyId?.Value ?? 1) + 1 : 2;
                
                customPart.Properties.AppendChild(new CustomDocumentProperty() {{
                    FormatId = "{{D5CDD505-2E9C-101B-9397-08002B2CF9AE}}",
                    PropertyId = propId,
                    Name = "WebExtensionProperty",
                    VTLPWSTR = new DocumentFormat.OpenXml.VariantTypes.VTLPWSTR("{target_url}")
                }});
                customPart.Properties.Save();
                
                // Setup WebExtension
                if (doc.WebExTaskpanesPart != null)
                    doc.DeletePart(doc.WebExTaskpanesPart);
                var taskpanesPart = doc.AddWebExTaskpanesPart();
                var webExtPart = taskpanesPart.AddNewPart<WebExtensionPart>("rId1");
                
                var webExt = new We.WebExtension() {{ Id = "{{635BF0CD-42CC-4174-B8D2-6D375C9A759E}}" }};
                webExt.AddNamespaceDeclaration("we", "http://schemas.microsoft.com/office/webextensions/webextension/2010/11");
                
                // Store reference
                var storeRef = new We.WebExtensionStoreReference() {{ Id = "wa104380862", Version = "1.1.0.0", Store = "en-US", StoreType = "OMEX" }};
                webExt.Append(storeRef);
                
                // Alternative references
                var altRefs = new We.WebExtensionReferenceList();
                webExt.Append(altRefs);
                
                // Properties
                var propBag = new We.WebExtensionPropertyBag();
                propBag.Append(new We.WebExtensionProperty() {{ Name = "Office.AutoShowTaskpaneWithDocument", Value = "true" }});
                propBag.Append(new We.WebExtensionProperty() {{ Name = "targetUrl", Value = "{target_url}" }});
                webExt.Append(propBag);
                
                // Bindings
                var bindings = new We.WebExtensionBindingList();
                webExt.Append(bindings);
                
                // Snapshot
                var snapshot = new We.Snapshot();
                snapshot.AddNamespaceDeclaration("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
                webExt.Append(snapshot);
                
                webExtPart.WebExtension = webExt;
                
                var taskpanes = new Wetp.Taskpanes();
                taskpanes.AddNamespaceDeclaration("wetp", "http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11");
                var taskpane = new Wetp.WebExtensionTaskpane() {{ DockState = "right", Visibility = true, Width = 350D, Row = 4U }};
                var taskpaneRef = new Wetp.WebExtensionPartReference() {{ Id = "rId1" }};
                taskpaneRef.AddNamespaceDeclaration("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
                taskpane.Append(taskpaneRef);
                taskpanes.Append(taskpane);
                taskpanesPart.Taskpanes = taskpanes;
                
                // Save the document
                doc.Save();
                
                Console.WriteLine("Success: Taskpane add-in embedded with URL: {target_url}");
            }}
        }} catch (Exception ex) {{ Console.WriteLine($"Error: {{ex.Message}}"); }}
    }}
}}"""

def create_csharp_script_contentapp(target_url="https://mashellhan.github.io/exceldash/dashboard_example.html"):
    """Create a C# script to embed a Content add-in using OpenXML SDK."""
    return f"""
using System;
using System.Linq;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Office2013.WebExtension;
using DocumentFormat.OpenXml.CustomProperties;
using A = DocumentFormat.OpenXml.Drawing;
using Xdr = DocumentFormat.OpenXml.Drawing.Spreadsheet;
using We = DocumentFormat.OpenXml.Office2013.WebExtension;
using DocumentFormat.OpenXml;

class Program {{
    static void Main(string[] args) {{
        if (args.Length < 1) {{ Console.WriteLine("Please provide the Excel file path"); return; }}
        
        try {{
            using (var doc = SpreadsheetDocument.Open(args[0], true)) {{
                // Add Excel custom property for HTML to read
                var customPart = doc.CustomFilePropertiesPart ?? doc.AddCustomFilePropertiesPart();
                if (customPart.Properties == null) customPart.Properties = new Properties();
                
                var existing = customPart.Properties.Elements<CustomDocumentProperty>()
                    .FirstOrDefault(p => p.Name?.Value == "WebExtensionProperty");
                existing?.Remove();
                
                var props = customPart.Properties.Elements<CustomDocumentProperty>();
                var propId = props.Any() ? props.Max(p => p.PropertyId?.Value ?? 1) + 1 : 2;
                
                customPart.Properties.AppendChild(new CustomDocumentProperty() {{
                    FormatId = "{{D5CDD505-2E9C-101B-9397-08002B2CF9AE}}",
                    PropertyId = propId,
                    Name = "WebExtensionProperty",
                    VTLPWSTR = new DocumentFormat.OpenXml.VariantTypes.VTLPWSTR("{target_url}")
                }});
                customPart.Properties.Save();
                
                // Setup WebExtension
                var ws = doc.WorkbookPart.WorksheetParts.First();
                var dp = ws.DrawingsPart ?? ws.AddNewPart<DrawingsPart>();
                
                if (!ws.Worksheet.Elements<DocumentFormat.OpenXml.Spreadsheet.Drawing>().Any()) {{
                    ws.Worksheet.Append(new DocumentFormat.OpenXml.Spreadsheet.Drawing() {{ Id = ws.GetIdOfPart(dp) }});
                    ws.Worksheet.Save();
                }}
                
                dp.GetPartsOfType<WebExtensionPart>().ToList().ForEach(p => dp.DeletePart(p));
                var wep = dp.AddNewPart<WebExtensionPart>();
                var relId = dp.GetIdOfPart(wep);
                
                var we = new We.WebExtension() {{ Id = "{{C407451D-E398-6C05-D1E9-0652C438411C}}" }};
                we.AddNamespaceDeclaration("we", "http://schemas.microsoft.com/office/webextensions/webextension/2010/11");
                we.Append(new We.WebExtensionStoreReference() {{ Id = "WA200008846", Version = "1.0.0.0", Store = "WA200008846", StoreType = "OMEX" }});
                we.Append(new We.WebExtensionReferenceList());
                we.Append(new We.WebExtensionPropertyBag());
                we.Append(new We.WebExtensionBindingList());
                var snap = new We.Snapshot();
                snap.AddNamespaceDeclaration("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
                we.Append(snap);
                
                wep.WebExtension = we;
                
                // Phase3: WebExtension Drawing
                var wsDr = dp.WorksheetDrawing ?? new Xdr.WorksheetDrawing();
                wsDr.Append(new Xdr.TwoCellAnchor(
                    new Xdr.FromMarker(new Xdr.ColumnId("10"), new Xdr.ColumnOffset("0"), new Xdr.RowId("1"), new Xdr.RowOffset("0")),
                    new Xdr.ToMarker(new Xdr.ColumnId("38"), new Xdr.ColumnOffset("0"), new Xdr.RowId("55"), new Xdr.RowOffset("0")),
                    new Xdr.GraphicFrame(
                        new Xdr.NonVisualGraphicFrameProperties(
                            new Xdr.NonVisualDrawingProperties() {{ Id = 2U, Name = "Societas Report Add-in" }},
                            new Xdr.NonVisualGraphicFrameDrawingProperties()),
                        new Xdr.Transform(new A.Offset() {{ X = 0, Y = 0 }}, new A.Extents() {{ Cx = 0, Cy = 0 }}),
                        new A.Graphic(new A.GraphicData(new We.WebExtensionReference() {{ Id = relId }}) 
                        {{ Uri = "http://schemas.microsoft.com/office/webextensions/webextension/2010/11" }})),
                    new Xdr.ClientData()));
                
                dp.WorksheetDrawing = wsDr;
                dp.WorksheetDrawing.Save();
                ws.Worksheet.Save();
                
                // Save the document
                doc.Save();
                
                Console.WriteLine("Success: Content add-in embedded with URL: {target_url}");
            }}
        }} catch (Exception ex) {{ Console.WriteLine($"Error: {{ex.Message}}"); }}
    }}
}}"""

def install_dependencies():
    """Install .NET SDK and dependencies."""
    try:
        subprocess.run(["dotnet", "--version"], check=True, capture_output=True)
        print("✓ .NET SDK is available")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("✗ .NET SDK not found. Please install .NET SDK 6.0 or later.")
        return False

def embed_addin(excel_file_path, target_url="https://mashellhan.github.io/exceldash/dashboard_example.html", addin_type="contentapp"):
    """Embed an Office Add-in into an Excel file."""
    if not os.path.exists(excel_file_path):
        print(f"Error: Excel file '{excel_file_path}' not found.")
        return False
    
    if not install_dependencies():
        return False
    
    # Create C# script
    script_func = create_csharp_script_contentapp if addin_type == "contentapp" else create_csharp_script_taskpane
    csharp_code = script_func(target_url)
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.cs', delete=False) as f:
        f.write(csharp_code)
        cs_file = f.name
    
    try:
        # Compile and run
        exe_file = cs_file.replace('.cs', '.exe')
        subprocess.run([
            "dotnet", "new", "console", "--force", "--output", os.path.dirname(cs_file)
        ], check=True, capture_output=True)
        
        subprocess.run([
            "dotnet", "add", os.path.dirname(cs_file), "package", "DocumentFormat.OpenXml", "--version", "2.20.0"
        ], check=True, capture_output=True)
        
        os.replace(cs_file, os.path.join(os.path.dirname(cs_file), "Program.cs"))
        
        result = subprocess.run([
            "dotnet", "run", "--project", os.path.dirname(cs_file), "--", excel_file_path
        ], capture_output=True, text=True)
        
        print(result.stdout)
        if result.stderr:
            print("Errors:", result.stderr)
        
        return result.returncode == 0
        
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        return False
    finally:
        # Cleanup
        try:
            import shutil
            shutil.rmtree(os.path.dirname(cs_file), ignore_errors=True)
        except:
            pass

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python embed_addin_right.py <excel_file> [target_url] [addin_type]")
        sys.exit(1)
    
    excel_file = sys.argv[1]
    target_url = sys.argv[2] if len(sys.argv) > 2 else "https://mashellhan.github.io/exceldash/dashboard_example.html"
    addin_type = sys.argv[3] if len(sys.argv) > 3 else "contentapp"
    
    success = embed_addin(excel_file, target_url, addin_type)
    sys.exit(0 if success else 1)

    