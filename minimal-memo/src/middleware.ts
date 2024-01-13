import { auth } from "@/common/auth";
import { NextResponse } from "next/server";
import { ApiErrorResponse } from "@/types/response";
import { StatusCode } from "status-code-enum";

export default auth(async (request) => {
  // /api 以下のみ適用
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return;
  }

  // /api/auth 以下は認証チェックしない
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }

  // 認証チェック
  if (!request.auth?.user?.id) {
    return NextResponse.json<ApiErrorResponse>(
      { message: "認証エラー" },
      { status: StatusCode.ClientErrorUnauthorized }
    );
  }
});
