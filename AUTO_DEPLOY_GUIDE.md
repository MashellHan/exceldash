# Excel Online 插件自动安装指南

## 🚀 自动安装方法概览

| 方法 | 适用场景 | 安装范围 | 管理难度 | 推荐指数 |
|------|----------|----------|----------|----------|
| **Microsoft 365 管理中心** | 企业/组织 | 整个组织 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **SharePoint App Catalog** | 企业内部 | 指定用户组 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Office Store (AppSource)** | 公开发布 | 全球用户 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Teams 应用集成** | Teams 环境 | Teams 用户 | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **URL 链接分发** | 快速分享 | 点击链接的用户 | ⭐⭐ | ⭐⭐⭐ |

---

## 🏢 方法1：Microsoft 365 管理中心（推荐）

### 适用场景
- **企业/组织环境**
- **需要批量部署**
- **集中管理和控制**

### 配置步骤
1. **管理员登录**：
   ```url
   https://admin.microsoft.com
   ```

2. **导航到加载项管理**：
   ```
   设置 → 集成应用 → Office 加载项 → 部署加载项
   ```

3. **上传并配置**：
   - 选择"上传自定义应用"
   - 上传 `manifest_enterprise.xml`
   - 配置部署设置

4. **部署范围设置**：
   - ✅ 整个组织
   - ✅ 特定用户组
   - ✅ 指定用户列表

### 优势
- ✅ **自动推送**到所有目标用户
- ✅ **集中管理**，可随时启用/禁用
- ✅ **权限控制**，管理员完全控制
- ✅ **无需用户操作**

---

## 📚 方法2：SharePoint App Catalog

### 适用场景
- **企业内部应用**
- **需要版本控制**
- **分阶段部署**

### 配置步骤
1. **创建 App Catalog**：
   ```powershell
   # PowerShell 配置示例
   Connect-SPOService -Url https://yourtenant-admin.sharepoint.com
   New-SPOSite -Url https://yourtenant.sharepoint.com/sites/appcatalog -Owner admin@yourtenant.com -Title "App Catalog"
   ```

2. **上传应用包**：
   - 创建 `.sppkg` 包
   - 上传到 App Catalog
   - 配置部署权限

### 优势
- ✅ **版本管理**
- ✅ **审批流程**
- ✅ **分阶段发布**

---

## 🌍 方法3：Office Store (AppSource) 发布

### 适用场景
- **公开发布**
- **商业化应用**
- **全球分发**

### 发布流程
1. **注册开发者账户**
2. **应用审核准备**
3. **提交到 AppSource**
4. **微软审核通过**
5. **自动出现在用户的"插入"菜单**

### 优势
- ✅ **全球自动分发**
- ✅ **微软官方认证**
- ✅ **用户信任度高**
- ✅ **自动更新机制**

---

## 🔗 方法4：URL 链接自动安装（最简单）

### 原理
通过特殊的 URL 格式，用户点击即可自动安装插件到 Excel Online。

### 实现步骤

#### 1. 生成安装链接
```javascript
// 自动安装 URL 格式
const manifestUrl = "https://your-domain.com/manifest_online.xml";
const installUrl = `https://office.com/launch/excel?auth=2&home=1&add-in=${encodeURIComponent(manifestUrl)}`;
```

#### 2. 创建安装页面
```html
<!DOCTYPE html>
<html>
<head>
    <title>安装 HTML Report Viewer</title>
    <meta charset="utf-8">
</head>
<body>
    <div style="text-align: center; padding: 50px;">
        <h2>🚀 一键安装 HTML Report Viewer</h2>
        <p>点击下面的按钮将插件自动安装到您的 Excel Online</p>
        
        <a href="https://office.com/launch/excel?auth=2&home=1&add-in=https%3A//your-domain.com/manifest_online.xml" 
           style="display: inline-block; background: #0078d4; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px;">
            📊 安装到 Excel Online
        </a>
        
        <br><br>
        <small>需要 Microsoft 365 账户登录</small>
    </div>
</body>
</html>
```

### 优势
- ✅ **最简单的分发方式**
- ✅ **一键安装**
- ✅ **无需管理员权限**
- ✅ **适合个人用户**

---

## ⚙️ 方法5：Teams 应用集成

### 配置 Teams 应用
1. **创建 Teams 应用清单**
2. **集成 Excel Online 插件**
3. **发布到 Teams 应用商店**

### Teams 清单示例
```json
{
    "manifestVersion": "1.14",
    "version": "1.0.0",
    "id": "28d4a3e2-65c6-43d0-9c3b-0a336ab67701",
    "packageName": "com.yourcompany.htmlreportviewer",
    "developer": {
        "name": "Your Company",
        "websiteUrl": "https://your-domain.com",
        "privacyUrl": "https://your-domain.com/privacy",
        "termsOfUseUrl": "https://your-domain.com/terms"
    },
    "name": {
        "short": "HTML Report Viewer",
        "full": "HTML Report Viewer for Excel"
    },
    "description": {
        "short": "View HTML dashboards in Excel",
        "full": "Powerful HTML dashboard viewer for Excel Online and Desktop"
    },
    "staticTabs": [],
    "configurableTabs": [],
    "bots": [],
    "connectors": [],
    "validDomains": [
        "8080-ibcq34tzqozbvcxg5c7o0-b334fc63.e2b.dev"
    ],
    "webApplicationInfo": {
        "id": "28d4a3e2-65c6-43d0-9c3b-0a336ab67701",
        "resource": "https://your-domain.com"
    }
}
```

---

## 🎯 推荐的实施策略

### 🏢 企业环境（推荐）
```mermaid
graph LR
    A[管理员] --> B[Microsoft 365 管理中心]
    B --> C[上传 manifest]
    C --> D[配置部署范围]
    D --> E[自动推送给用户]
    E --> F[用户直接使用]
```

### 👥 个人/小团队（推荐）
```mermaid
graph LR
    A[开发者] --> B[创建安装页面]
    B --> C[生成安装链接]
    C --> D[分享给用户]
    D --> E[用户点击安装]
    E --> F[自动添加到Excel]
```

### 🌍 公开发布
```mermaid
graph LR
    A[开发者] --> B[AppSource 提交]
    B --> C[微软审核]
    C --> D[发布到商店]
    D --> E[用户搜索安装]
```

---

## 📋 快速实施清单

### ✅ 立即可用（URL 链接方式）
- [ ] 确保 manifest_online.xml 可通过 HTTPS 访问
- [ ] 创建安装页面 HTML
- [ ] 生成安装链接
- [ ] 测试安装流程
- [ ] 分享给用户

### ✅ 企业部署
- [ ] 联系 IT 管理员
- [ ] 准备 manifest_enterprise.xml
- [ ] 在测试环境验证
- [ ] 提交部署申请
- [ ] 监控部署状态

### ✅ 长期计划（AppSource）
- [ ] 完善应用功能
- [ ] 准备商店素材
- [ ] 注册开发者账户
- [ ] 提交审核
- [ ] 维护和更新

---

## 🚨 注意事项

1. **HTTPS 必须**：所有资源必须通过 HTTPS 提供
2. **CORS 配置**：正确配置跨域访问头
3. **安全审核**：企业部署通常需要安全审核
4. **用户权限**：确保用户有安装插件的权限
5. **版本管理**：建立版本更新机制

## 📞 技术支持

如需帮助实施任何方案，请准备：
- 目标用户规模
- 企业/个人使用场景  
- IT 环境限制
- 安全要求 