import React, { memo, useCallback } from "react";
import { ConfigProvider, theme, Tree, Drawer } from "antd";
import { DownOutlined } from "@ant-design/icons";

const getTocTreeData = () => {
  // 获取所有的 h1 到 h6 元素
  const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

  // 将 NodeList 转换为数组
  const headerArray = Array.from(headers);

  // 生成嵌套数组
  function generateHeaders(headers) {
    const nestedHeaders = [];

    let currentLevel = 1; // 当前层级，从 h1 开始
    let currentContainer = nestedHeaders; // 当前容器，最初是根数组

    const headerStack = []; // 用于跟踪当前层级的堆栈

    headers.forEach((header) => {
      const level = parseInt(header.tagName.slice(1), 10); // 获取当前 header 的层级

      const newItem = {
        text: header.innerHTML,
        level,
        children: [],
      };

      if (level === currentLevel) {
        // 如果层级与当前层级相同，直接加入当前容器
        currentContainer.push(newItem);
      } else if (level > currentLevel) {
        // 如果层级比当前层级更深，加入到前一个 header 的 children 中，并更新当前层级和容器
        while (currentLevel < level) {
          headerStack.push({
            level: currentLevel,
            container: currentContainer,
          });
          currentContainer =
            currentContainer[currentContainer.length - 1].children;
          currentLevel++;
        }
        currentContainer.push(newItem);
      } else {
        // 如果层级比当前层级更浅，回退到合适的层级再加入
        while (currentLevel > level) {
          const last = headerStack.pop();
          currentLevel = last.level;
          currentContainer = last.container;
        }
        currentContainer.push(newItem);
      }
    });

    return nestedHeaders;
  }

  // Tree 组件的树形数据
  function generateTreeData(array) {
    return array.map((item) => {
      return {
        title: item.text,
        key: item.text + item.level,
        children:
          item.children.length == 0 ? null : generateTreeData(item.children),
      };
    });
  }

  return generateTreeData(generateHeaders(headerArray));
};

const Toc = memo(({ open, setOpen, darkMode }) => {
  // 点击目录标题
  const onSelect = useCallback((key) => {
    const HId = key[0].toLowerCase().substring(0,key[0].length-1);
    const h = document.getElementById(encodeURI(HId));
    if (h) {
      h.scrollIntoView();
    }
  });

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Drawer
        rootStyle={{}}
        title="目录"
        width={252}
        open={open}
        onClose={() => setOpen(false)}
        placement={window.innerWidth < 768 ? "bottom" : "right"}
      >
        <ConfigProvider theme={{ token: { colorBgContainer: "transparent" } }}>
          <Tree
            showLine
            defaultExpandAll
            switcherIcon={<DownOutlined />}
            onSelect={onSelect}
            treeData={getTocTreeData()}
          />
        </ConfigProvider>
      </Drawer>
    </ConfigProvider>
  );
});

export default Toc;
