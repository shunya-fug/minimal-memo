"use client";

import { fetcher } from "@/common/fetcher";
import { GetTagsResponse } from "@/types/response";
import { FolderIcon } from "@heroicons/react/16/solid";
import { TagType } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";
import useSWR from "swr";

export const SideMenuBar = () => {
  const { data: tagList } = useSWR<GetTagsResponse[], ApiError>("/api/tags", fetcher);

  return (
    <ul className="menu bg-base-200 w-56 subpixel-antialiased">
      <div className="text-lg mx-auto flex items-center gap-2">
        <FolderIcon className="w-4 h-4" />
        Folder Tags
      </div>
      {tagList
        ?.filter((tag) => tag.type === TagType.FOLDER)
        .map((tag) => (
          <li key={`tag-${tag.id}`} className="menu-md">
            <div>
              <a>{tag.value}</a>
              <span className="badge badge-primary">{tag._count.memoList}</span>
            </div>
          </li>
        ))}
    </ul>
  );
};
