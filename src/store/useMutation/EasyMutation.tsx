import axios from "axios";
import { useMutation } from "react-query";

interface IPost {
  title: string;
  body: string;
}

const createPost = async (post: IPost) => {
  const { data } = await axios.post(
    `https://jsonplaceholder.typicode.com/posts`,
    post
  );

  return data;
};

// В этом блоке представлен простой пример использования
// react-query для  отправки данных на сервер
const EasyMutation: React.FC = () => {
  const mutation = useMutation(createPost);

  const handleSubmit = (post: IPost) => {
    mutation.mutate(post);
  };

  return (
    <div>
      <button onClick={() => handleSubmit({ title: "Title", body: "Body" })}>
        Отправить данные
      </button>
      {mutation.isSuccess && <h2>Success!</h2>}
      {mutation.isLoading && <h2>Loading...</h2>}
      {mutation.isError && <h2>Error...</h2>}
    </div>
  );
};

export default EasyMutation;
