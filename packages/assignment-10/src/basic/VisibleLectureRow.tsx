import { Button, Td, Tr } from "@chakra-ui/react";
import { Lecture } from "./types";
import { memo } from "react";

type Props = {
  lecture: Lecture;
  addSchedule: (lecture: Lecture) => void;
};
const VisibleLectureRow = ({ lecture, addSchedule }: Props) => {
  const { id, grade, title, credits, major, schedule } = lecture;

  return (
    <Tr>
      <Td width="100px">{id}</Td>
      <Td width="50px">{grade}</Td>
      <Td width="200px">{title}</Td>
      <Td width="50px">{credits}</Td>
      <Td width="150px" dangerouslySetInnerHTML={{ __html: major }} />
      <Td width="150px" dangerouslySetInnerHTML={{ __html: schedule }} />
      <Td width="80px">
        <Button size="sm" colorScheme="green" onClick={() => addSchedule(lecture)}>
          추가
        </Button>
      </Td>
    </Tr>
  );
};
export default memo(VisibleLectureRow);
