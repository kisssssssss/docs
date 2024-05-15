"use client";
import { useRouter } from "next/navigation";
import React, { memo, useCallback } from "react";
import { Tree, ConfigProvider, theme } from "antd";

const { DirectoryTree } = Tree;

const HomeDocs = memo(({ darkMode, docs }) => {
  const router = useRouter();

  const onSelect = useCallback((keys, info) => {
    if (info.node.isLeaf) {
      router.push(`/docs/${info.node.path}`);
    }
  });

  const onExpand = useCallback((keys, info) => {});

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorBgContainer: "transparent",
          fontSize: "16px",
          fontFamily: "CaskaydiaCoveNerdFontMono, -apple-system",
        },
        components: {
          Tree: {
            directoryNodeSelectedBg: darkMode ? "#ffffff0d" : "#f6f4fd6f",
            directoryNodeSelectedColor: "#8b5cf6",
          },
        },
      }}
    >
      <DirectoryTree
        showLine
        multiple
        onExpand={onExpand}
        onSelect={onSelect}
        treeData={docs}
        rootStyle={{ marginLeft: "8px" }}
      />
    </ConfigProvider>
  );
});

export default HomeDocs;
