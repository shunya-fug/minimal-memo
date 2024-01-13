import { Tag as TagComponent } from "@/components/Tag";
import { MemoOptionalDefaultsWithOptionalTagList } from "@/types/memo";
import { TagType } from "@prisma/client";
import { useFieldArray } from "react-hook-form";

/**
 * タグ入力
 */
export const TagsInput = () => {
  const {
    fields: tagList,
    remove,
    append,
  } = useFieldArray<MemoOptionalDefaultsWithOptionalTagList>({ name: "tagList" });

  /**
   * タグ削除・追加
   *
   * @param e キーボードイベント
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 変換中は何もしない
    if (e.nativeEvent.isComposing) {
      return;
    }
    // タグ削除
    const value = e.currentTarget.value;
    if (e.key === "Backspace" && value === "" && tagList.length > 0) {
      remove(tagList.length - 1);
      return;
    }
    // タグ追加
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();
      append({ value: value.trim(), type: value.trim().startsWith("/") ? TagType.FOLDER : TagType.NORMAL });
      e.currentTarget.value = "";
      return;
    }
  };

  return (
    <div className="flex gap-1 input input-bordered rounded-sm items-center flex-wrap h-auto py-2">
      {tagList.map((tag, i) => {
        return <TagComponent key={`tag-input-${i}`} tag={tag} onClose={() => remove(i)} />;
      })}
      <input type="text" className="flex-grow bg-transparent" placeholder="Add tags..." onKeyDown={handleKeyDown} />
    </div>
  );
};
