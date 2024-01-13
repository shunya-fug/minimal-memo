import { Tag } from "@/components/Tag";
import { GetMemosResponse } from "@/types/response";

export const Memo = ({ memo }: { memo: GetMemosResponse }) => {
  return (
    <div className="card card-compact my-3 mx-6 p-3 bg-primary-content rounded-sm" key={`card-${memo.id}`}>
      <div className="card-body subpixel-antialiased">
        {/* 作成日 */}
        <span>{memo.createdAt.toString()}</span>
        {/* 内容 */}
        <pre className="m-0 p-0 bg-transparent">{memo.content}</pre>
        {/* タグ */}
        {memo.tagList.length > 0 && (
          <>
            <div className="divider my-0"></div>
            <div className="flex gap-1">
              {memo.tagList.map((tag) => (
                <Tag key={`tag-${memo.id}-${tag.id}`} tag={tag} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
