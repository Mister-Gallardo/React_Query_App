import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface IPost {
  id?: number;
  title: string;
  body: string;
}

const fetchPosts = async () => {
  const { data } = await axios.get<IPost[]>(
    "https://678fec7549875e5a1a93d806.mockapi.io/api/v1/posts"
  );

  return data;
};

const createPost = async (post: IPost) => {
  const { data } = await axios.post(
    `https://678fec7549875e5a1a93d806.mockapi.io/api/v1/posts`,
    post
  );

  return data;
};

// В этом блоке представлен пример
// использования useQuery и useMutation
const QueryAndMutation: React.FC = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading, isError } = useQuery<IPost[]>("posts", fetchPosts, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: createPost,

    onSuccess() {
      console.log("Успешно!");

      queryClient.invalidateQueries(["posts"]);
    },

    // при ошибке
    onError(error) {
      console.log(error);
    },

    // по дефолту
    onSettled() {
      console.log("Запрос выполнен.");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts...</div>;

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handleSubmit = () => {
    mutation.mutate({ title, body: description });
  };

  return (
    <div>
      <h2>The list of Posts</h2>
      <form style={{ display: "flex", gap: 10 }}>
        <input
          onChange={(e) => handleChangeTitle(e.target.value)}
          value={title}
          placeholder="Введите название..."
        />
        <input
          onChange={(e) => handleChangeDescription(e.target.value)}
          value={description}
          placeholder="Введите описание..."
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!(!!title && !!description)}
        >
          Отправить
        </button>
      </form>
      {data?.map((post: IPost) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default QueryAndMutation;
