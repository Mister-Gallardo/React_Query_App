import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

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
const NormalMutation: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    // функция
    mutationFn: createPost,

    // при успехе
    onSuccess() {
      alert("Успешно!");

      // Обновление данных после успешной записи
      // Первый вариант наиболее популярный

      // 1 вариант
      // помечаем данные с ключом items как устаревшие.
      // React Query будет пытаться перезапросить эти данные
      // при следующем рендере компонента, который использует этот ключ.
      queryClient.invalidateQueries(["posts"]);

      // 2 вариант
      // удаляет данные с ключом 'items' из кэша
      queryClient.resetQueries(["posts"]);
      // немедленно запрашиваем данные под ключом 'items'
      queryClient.refetchQueries(["posts"]);
    },

    // при ошибке
    onError(error) {
      alert(error);
    },

    // по дефолту
    onSettled() {
      alert("Конец!");
    },
  });

  const handleSubmit = (post: IPost) => {
    mutation.mutate(post);
  };

  return (
    <div>
      <button onClick={() => handleSubmit({ title: "Title", body: "Body" })}>
        Отправить данные
      </button>
    </div>
  );
};

export default NormalMutation;
