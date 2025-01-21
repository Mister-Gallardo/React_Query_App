import axios from "axios";
import { useQuery } from "react-query";

interface IPost {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async () => {
  const { data } = await axios.get<IPost[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return data;
};

// В этом блоке представлен простой пример использования
// react-query для получения данных с сервера
const EasyQuery: React.FC = () => {
  const { data, isLoading, isError } = useQuery<IPost[]>("posts", fetchPosts, {
    keepPreviousData: true, // Сохраняет данные между запросами при пагинации
    refetchOnWindowFocus: false, // рефетчинг при фокусе на окно
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts...</div>;

  return (
    <div>
      <h2>The list of Posts</h2>
      {data?.map((post: IPost) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default EasyQuery;
