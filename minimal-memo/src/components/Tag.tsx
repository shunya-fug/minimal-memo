import { TagOptionalDefaults } from "@/generated/zod/modelSchema";
import { FolderIcon, TagIcon } from "@heroicons/react/16/solid";
import { TagType } from "@prisma/client";
import React from "react";

type TagProps = React.ComponentPropsWithoutRef<"span"> & {
  tag: TagOptionalDefaults;
  onClose?: () => void;
};

export const Tag = ({ tag, onClose }: TagProps) => {
  /**
   * タグタイプアイコン
   */
  const TagTypeIcon = () => {
    switch (tag.type) {
      case TagType.FOLDER:
        return <FolderIcon className="w-4 h-4" />;
      case TagType.NORMAL:
        return <TagIcon className="w-4 h-4" />;
    }
  };

  /**
   * ツールチップ
   * `onClose`が定義されている場合のみ表示
   */
  const Tooltip = ({ children }: { children: React.ReactNode }) => {
    if (!onClose) {
      return <>{children}</>;
    }

    return (
      <span className="tooltip tooltip-bottom tooltip-error" data-tip="Remove" onClick={onClose}>
        {children}
      </span>
    );
  };

  return (
    <Tooltip>
      <span className="btn btn-xs rounded-md">
        <TagTypeIcon />
        {tag.value}
      </span>
    </Tooltip>
  );
};
