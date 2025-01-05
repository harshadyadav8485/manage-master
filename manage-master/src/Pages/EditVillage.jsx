import { useParams } from "react-router-dom";

export const EditVillage = () => {
  const { villageId } = useParams();
  console.log("villageId", villageId);

  return (
    <>
      <h1>Edit Village</h1>
    </>
  );
};
