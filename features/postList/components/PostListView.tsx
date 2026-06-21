import type { NotionPageMeta } from "features/notion/types";
import { getNotionPageMeta } from "features/notion/utils/meta/getNotionPageMeta";
import Link from "next/link";
import * as css from "./PostListView.css";

interface PostListViewProps {
  posts: NotionPageMeta[];
}

export function PostListView({ posts }: PostListViewProps) {
  return (
    <div className={css.postListFrame}>
      <div className={css.viewLink}>
        <PostListView.TitleRow />
        {posts.map((p) => (
          <PostListView.Row key={p.id} meta={p} />
        ))}
      </div>
    </div>
  );
}

PostListView.Row = ({ meta }: { meta: NotionPageMeta }) => {
  const postMeta = getNotionPageMeta(meta);
  const year = postMeta.date.slice(0, 4);
  const path = `/${year}/${postMeta.slug}`;
  return (
    <li className={css.postLinkFrame}>
      <Link href={path} className={css.postLinkInner}>
        <span className={css.postLinkDate}>
          {postMeta.date.split("-").join(".")}
        </span>
        <span className={css.postLinkTitle}>{`${postMeta.title}`}</span>
      </Link>
    </li>
  );
};

PostListView.TitleRow = () => {
  return (
    <div className={css.postTitleRow}>
      <span className={css.postLinkDate}>DATE</span>
      <span className={css.postLinkDate}>TITLE</span>
    </div>
  );
};
