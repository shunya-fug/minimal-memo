import { Tag } from "@/components/Tag";
import { MemoWithTagList } from "@/types/memo";

export const Memo = ({ memo }: { memo: MemoWithTagList }) => {
  return (
    <div className="card card-compact my-3 mx-6 p-3 bg-primary-content rounded-sm" key={`card-${memo.id}`}>
      <div className="card-body">
        {/* 作成日 */}
        <span>{memo.createdAt.toString()}</span>
        {/* 内容 */}
        <p>{memo.content}</p>
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
