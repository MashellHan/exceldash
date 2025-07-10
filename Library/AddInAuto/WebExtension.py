import zipfile
from pathlib import Path
import tempfile
import shutil

def inject_addin_to_excel(input_xlsx_path: str, output_xlsx_path: str, addin_id: str = "WA200000113"):
    """
    向 Excel 文件注入完整的 Web Extension Add-in 配置
    基于 template_with_addin 的完整结构
    """
    
    # 生成唯一的 Web Extension ID
    web_extension_guid = "{65C64ED3-F889-4FDA-A69A-DC5B2CB67D4A}"
    
    # 1. Task Panes 配置 (taskpanes.xml)
    taskpanes_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<wetp:taskpanes xmlns:wetp="http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11">
    <wetp:taskpane dockstate="right" visibility="0" width="350" row="3">
        <wetp:webextensionref xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId1"/>
    </wetp:taskpane>
</wetp:taskpanes>'''

    # 2. Web Extension 定义 (webextension1.xml)
    webextension_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<we:webextension xmlns:we="http://schemas.microsoft.com/office/webextensions/webextension/2010/11" id="{web_extension_guid}">
    <we:reference id="{addin_id.lower()}" version="1.0.0.0" store="en-US" storeType="OMEX"/>
    <we:alternateReferences>
        <we:reference id="{addin_id}" version="1.0.0.0" store="{addin_id}" storeType="OMEX"/>
    </we:alternateReferences>
    <we:properties/>
    <we:bindings/>
    <we:snapshot xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/>
</we:webextension>'''

    # 3. 关系文件 (taskpanes.xml.rels)
    taskpanes_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.microsoft.com/office/2011/relationships/webextension" Target="webextension1.xml"/>
</Relationships>'''

    # 拷贝 Excel 文件为输出文件并重建以注入 WebExtension
    input_path = Path(input_xlsx_path)
    output_path = Path(output_xlsx_path)
    
    # 使用临时文件重建 ZIP
    with tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx') as temp_file:
        temp_path = temp_file.name
    
    try:
        with zipfile.ZipFile(input_path, 'r') as source_zip, \
             zipfile.ZipFile(temp_path, 'w', zipfile.ZIP_DEFLATED) as target_zip:
            
            # 复制所有原始文件，同时更新 Content_Types.xml
            for item in source_zip.infolist():
                if item.filename == "[Content_Types].xml":
                    # 读取并更新 Content Types
                    content_types_data = source_zip.read(item).decode('utf-8')
                    
                    # 添加 WebExtension 相关的 Content Types
                    taskpanes_override = '<Override PartName="/xl/webextensions/taskpanes.xml" ContentType="application/vnd.ms-office.webextensiontaskpanes+xml"/>'
                    webextension_override = '<Override PartName="/xl/webextensions/webextension1.xml" ContentType="application/vnd.ms-office.webextension+xml"/>'
                    
                    # 检查并添加缺失的注册
                    if '/xl/webextensions/taskpanes.xml' not in content_types_data:
                        content_types_data = content_types_data.replace('</Types>', f'{taskpanes_override}</Types>')
                    
                    if '/xl/webextensions/webextension1.xml' not in content_types_data:
                        content_types_data = content_types_data.replace('</Types>', f'{webextension_override}</Types>')
                    
                    # 写入更新后的 Content Types
                    target_zip.writestr(item, content_types_data.encode('utf-8'))
                else:
                    # 复制其他文件
                    data = source_zip.read(item)
                    target_zip.writestr(item, data)
            
            # 添加 WebExtension 文件
            target_zip.writestr("xl/webextensions/taskpanes.xml", taskpanes_xml)
            target_zip.writestr("xl/webextensions/webextension1.xml", webextension_xml)
            target_zip.writestr("xl/webextensions/_rels/taskpanes.xml.rels", taskpanes_rels)
        
        # 移动临时文件到最终位置
        shutil.move(temp_path, str(output_path))
        
    except Exception as e:
        # 清理临时文件
        try:
            Path(temp_path).unlink()
        except:
            pass
        raise e

    print(f"✅ 完整的 Add-in {addin_id} 已注入到: {output_xlsx_path}")
    print(f"📁 生成的文件结构:")
    print(f"   └── xl/webextensions/")
    print(f"       ├── taskpanes.xml")
    print(f"       ├── webextension1.xml")
    print(f"       └── _rels/taskpanes.xml.rels")

def create_template_style_addin(input_xlsx_path: str, output_xlsx_path: str, addin_id: str = "WA200000113"):
    """
    创建模板风格的完整 Add-in 配置（对应 template_with_addin 结构）
    """
    inject_addin_to_excel(input_xlsx_path, output_xlsx_path, addin_id)

# 示例调用
if __name__ == "__main__":
    # 创建完整配置版本的 Add-in
    inject_addin_to_excel("template.xlsx", "output_with_addin.xlsx")
    
    # 也可以创建模板风格的版本
    # create_template_style_addin("template.xlsx", "template_style_output.xlsx")
