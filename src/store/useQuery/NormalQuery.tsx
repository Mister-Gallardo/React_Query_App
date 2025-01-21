import { useState } from "react";
import { useQuery } from "react-query";

interface IPost {
  id: number;
  title: string;
  body: string;
}

interface IPaginatedPosts {
  totalCount: number;
  data: IPost[];
}

const fetchPosts = async (
  page: number,
  pageSize: number = 5
): Promise<IPaginatedPosts> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`
  );
  const totalCount = Number(response.headers.get("X-Total-Count"));
  const data = await response.json();

  return { totalCount, data };
};

// В этом блоке представлен простой пример использования
// react-query для получения данных с сервера
const NormalQuery: React.FC = () => {
  const [page, setPage] = useState(1);

  //в данном случае ['posts', page] - это ключ запроса
  // при изменении ключа (какого-то элемента из этого массива,
  // а измениться может только page), запрос будет отправлен снова
  // и информация, соответственно, обновится
  const { data, isLoading, isError } = useQuery<IPaginatedPosts>(
    ["posts", page],
    () => fetchPosts(page),
    {
      keepPreviousData: true, // Сохраняет данные между запросами при пагинации
      staleTime: 10000, // данные считаются свежими в течение 10 секунд
      cacheTime: 1000 * 60 * 5, // кэширование в течение 5 минут
      refetchOnWindowFocus: true, // рефетчинг при фокусе на окно
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts...</div>;

  return (
    <div>
      <h2>The list of Posts</h2>
      {data?.data.map((post: IPost) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      <div style={{ display: "flex", gap: 20 }}>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          {"<"}
        </button>
        <p>{page}</p>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === (data?.totalCount as number) / 5}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default NormalQuery;
