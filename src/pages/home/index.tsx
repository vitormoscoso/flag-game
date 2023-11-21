import useAxios from "../../utils/apiClient";

export default function Home() {
  const { data, loading, error } = useAxios();

  console.log(data);
  

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
