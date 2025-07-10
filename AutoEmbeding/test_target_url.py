#!/usr/bin/env python3
"""
Test script for targetURL parameter passing in Excel Add-ins
"""

import sys
import os

# Add the parent directory to the path to import embed_addin_right
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from embed_addin_right import embed_addin

def test_target_url_embedding():
    """Test embedding add-ins with different target URLs"""
    
    test_cases = [
        {
            "name": "Dashboard Example",
            "url": "https://mashellhan.github.io/exceldash/dashboard_example.html",
            "type": "contentapp"
        },
        {
            "name": "Google",
            "url": "https://www.google.com",
            "type": "taskpane"
        },
        {
            "name": "Local Development",
            "url": "http://localhost:3000/dashboard",
            "type": "contentapp"
        }
    ]
    
    print("🧪 Testing targetURL embedding functionality...")
    print("=" * 60)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n📋 Test Case {i}: {test_case['name']}")
        print(f"   URL: {test_case['url']}")
        print(f"   Type: {test_case['type']}")
        
        # Create a sample Excel file for testing (if not exists)
        excel_file = f"test_book_{i}.xlsx"
        
        if not os.path.exists(excel_file):
            print(f"   ⚠️  Excel file {excel_file} not found. Please create it manually.")
            continue
        
        try:
            success = embed_addin(excel_file, test_case['url'], test_case['type'])
            if success:
                print(f"   ✅ Successfully embedded {test_case['type']} with URL: {test_case['url']}")
            else:
                print(f"   ❌ Failed to embed add-in")
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    print("\n" + "=" * 60)
    print("📝 Test Summary:")
    print("1. Each test case embeds a different target URL")
    print("2. The URL should be accessible via WebExtension properties")
    print("3. Open the Excel files to verify the add-ins load the correct URLs")
    print("4. Check browser console for URL source detection logs")

def print_usage():
    """Print usage instructions"""
    print("""
🔧 Target URL Testing Tool

Usage:
  python test_target_url.py [excel_file] [target_url] [addin_type]

Examples:
  python test_target_url.py Book1.xlsx "https://example.com" contentapp
  python test_target_url.py Book1.xlsx "https://google.com" taskpane

Parameters:
  excel_file  - Path to Excel file (.xlsx)
  target_url  - URL to embed in the add-in
  addin_type  - "contentapp" or "taskpane" (default: contentapp)

If no parameters provided, runs test cases with sample data.
""")

if __name__ == "__main__":
    if len(sys.argv) == 1:
        # No arguments - run test cases
        test_target_url_embedding()
    elif len(sys.argv) >= 3:
        # Arguments provided - run specific test
        excel_file = sys.argv[1]
        target_url = sys.argv[2]
        addin_type = sys.argv[3] if len(sys.argv) > 3 else "contentapp"
        
        print(f"🔧 Embedding {addin_type} add-in...")
        print(f"   File: {excel_file}")
        print(f"   URL: {target_url}")
        print(f"   Type: {addin_type}")
        
        try:
            success = embed_addin(excel_file, target_url, addin_type)
            if success:
                print("✅ Successfully embedded add-in!")
                print("\n📋 Next steps:")
                print("1. Open the Excel file in Office")
                print("2. The add-in should load your specified URL")
                print("3. Check browser console for debugging info")
            else:
                print("❌ Failed to embed add-in")
        except Exception as e:
            print(f"❌ Error: {e}")
    else:
        print_usage() 