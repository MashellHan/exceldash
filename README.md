# Excel HTML Dashboard Add-in

> 一个强大的Excel Office Add-in，允许您在Excel工作表中直接嵌入和显示HTML仪表板报告。

## 📋 项目简介

这是一个Content类型的Office Add-in，专为Microsoft Excel设计，能够将HTML内容无缝集成到Excel工作表中。通过这个Add-in，您可以：

- 📊 在Excel中直接显示HTML仪表板
- 🔄 实时更新数据可视化内容
- 🎨 展示美观的报告界面
- 📈 集成各种图表和数据展示组件

## ✨ 主要特性

- **📱 响应式设计** - 自适应Excel窗口大小
- **🔗 多域名支持** - 支持多个可信任的域名源
- **📊 数据交互** - 支持ReadWriteDocument权限，可与Excel数据交互
- **🎯 Content Add-in** - 直接嵌入到工作表单元格中
- **🌐 Web集成** - 支持各种在线HTML报告和仪表板

## 📁 项目结构

```
ExcelHTML/
├── manifest.xml              # Office Add-in清单文件
├── manifest copy.xml         # 清单文件备份
├── GDP_data_and_chart.xlsx   # 示例Excel文件
├── generate_and_install.ps1  # 生成和安装脚本
├── install_addin.ps1         # 安装脚本
└── README.md                 # 项目说明文档
```

## 🚀 快速开始

### 前提条件

- Microsoft Excel 2016 或更高版本
- Windows 10 或更高版本
- PowerShell 执行环境

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd ExcelHTML
   ```

2. **运行安装脚本**
   ```powershell
   # 方式1: 自动生成和安装
   .\generate_and_install.ps1
   
   # 方式2: 仅安装现有清单
   .\install_addin.ps1
   ```

3. **在Excel中启用Add-in**
   - 打开Excel
   - 转到 `插入` > `Office加载项`
   - 在 `我的加载项` 中找到 "HTML Report Viewer"
   - 点击 `添加` 启用

### 使用方法

1. 在Excel中选择要插入HTML内容的单元格区域
2. 从功能区选择 "HTML Report Viewer" Add-in
3. Add-in将在选定区域显示HTML仪表板内容

## ⚙️ 配置说明

### 清单文件 (manifest.xml)

主要配置项：

```xml
<!-- Add-in基本信息 -->
<Id>28d4a3e2-65c6-43d0-9c3b-0a336ab67701</Id>
<Version>1.0.0.2</Version>
<DisplayName DefaultValue="HTML Report Viewer 104"/>

<!-- 可信任的域名 -->
<AppDomains>
  <AppDomain>https://lizheng.me</AppDomain>
  <AppDomain>https://ai-bot.cn</AppDomain>
  <!-- 添加更多域名... -->
</AppDomains>

<!-- 默认HTML源 -->
<SourceLocation DefaultValue="https://lizheng.me/index.php/2025/06/context-budgeting-in-ai-coding-agents/"/>

<!-- 显示尺寸 -->
<RequestedWidth>1200</RequestedWidth>
<RequestedHeight>2000</RequestedHeight>
```

### 自定义HTML源

要使用自己的HTML仪表板：

1. 修改 `manifest.xml` 中的 `SourceLocation`
2. 确保HTML源域名添加到 `AppDomains` 列表中
3. 重新安装Add-in

## 🛠️ 开发

### 本地开发环境

1. **设置本地服务器**
   ```bash
   # 使用Python快速搭建
   python -m http.server 8080
   
   # 或使用Node.js
   npx http-server -p 8080
   ```

2. **修改清单文件**
   ```xml
   <SourceLocation DefaultValue="http://localhost:8080/your-dashboard.html"/>
   <AppDomain>http://localhost:8080</AppDomain>
   ```

3. **重新安装并测试**

### HTML要求

HTML内容应该：
- 使用响应式设计
- 避免使用弹窗等可能被Excel阻止的功能
- 考虑CORS策略
- 优化加载速度

## 📋 技术规格

- **类型**: Content Add-in
- **支持平台**: Excel for Windows
- **权限**: ReadWriteDocument
- **框架**: Office.js API
- **兼容性**: Excel 2016+

## 🔧 故障排除

### 常见问题

1. **Add-in无法加载**
   - 检查域名是否在AppDomains中
   - 验证HTML源是否可访问
   - 确认Excel版本兼容性

2. **显示异常**
   - 调整RequestedWidth/Height设置
   - 检查HTML内容的响应式设计
   - 验证CSS样式兼容性

3. **权限问题**
   - 确认PowerShell执行策略
   - 以管理员身份运行安装脚本

## 📝 更新日志

### v1.0.0.2
- 初始版本发布
- 支持基本HTML内容显示
- 多域名支持配置

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

[指定您的许可证类型]

## 📞 联系方式

如有问题，请通过以下方式联系：
- 项目Issues: [GitHub Issues链接]
- 邮箱: [您的邮箱]

---

**注意**: 这是一个开发阶段的项目，建议在生产环境使用前进行充分测试。 