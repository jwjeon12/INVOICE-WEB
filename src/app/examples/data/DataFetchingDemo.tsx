// 데이터 페칭 클라이언트 컴포넌트
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// JSONPlaceholder API 응답 타입
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

// 로딩 스켈레톤 컴포넌트
function PostSkeleton() {
  return (
    <Card className="p-4 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </Card>
  );
}

// 포스트 페칭 데모
export function PostsDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=4"
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Post[] = await res.json();
      setPosts(data);
      setFetched(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPosts([]);
    setFetched(false);
    setError(null);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">기본 fetch + 상태 관리</h3>
          <Badge variant="outline" className="text-xs">
            jsonplaceholder.typicode.com
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          버튼을 눌러 외부 API에서 데이터를 가져옵니다. 로딩/성공/오류 상태를
          확인해보세요.
        </p>
      </div>

      <div className="flex gap-2">
        <Button onClick={fetchPosts} disabled={loading}>
          {loading ? "로딩 중..." : "데이터 가져오기"}
        </Button>
        {fetched && (
          <Button variant="outline" onClick={reset}>
            초기화
          </Button>
        )}
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 오류 상태 */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">오류 발생: {error}</p>
        </div>
      )}

      {/* 성공 상태 */}
      {!loading && posts.length > 0 && (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="p-4 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm line-clamp-1">{post.title}</p>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  #{post.id}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {post.body}
              </p>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}

// 에러 처리 데모
export function ErrorHandlingDemo() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWithError = async (shouldFail: boolean) => {
    setLoading(true);
    setResult(null);
    try {
      if (shouldFail) {
        // 의도적으로 존재하지 않는 엔드포인트 호출
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/invalid-endpoint"
        );
        if (!res.ok) throw new Error(`HTTP 오류: ${res.status} ${res.statusText}`);
        setResult("성공");
      } else {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const user: User = await res.json();
        setResult(`성공: ${user.name} (${user.email})`);
      }
    } catch (e) {
      setResult(`오류: ${e instanceof Error ? e.message : "알 수 없는 오류"}`);
    } finally {
      setLoading(false);
    }
  };

  const isError = result?.startsWith("오류");

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">에러 처리 패턴</h3>
        <p className="text-sm text-muted-foreground">
          성공/실패 두 가지 케이스를 직접 테스트해보세요.
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => fetchWithError(false)}
          disabled={loading}
        >
          정상 요청
        </Button>
        <Button
          variant="destructive"
          onClick={() => fetchWithError(true)}
          disabled={loading}
        >
          에러 유발
        </Button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-4 rounded-full" />
          요청 중...
        </div>
      )}

      {result && (
        <div
          className={`rounded-lg p-3 text-sm font-mono ${
            isError
              ? "border border-destructive/50 bg-destructive/10 text-destructive"
              : "border border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400"
          }`}
        >
          {result}
        </div>
      )}
    </Card>
  );
}
