import { Checkbox, CheckboxGroup, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import { memo } from "react";
import { SearchOption } from "../SearchDialog";

type Props = {
  selectedGrades: number[];
  changeSearchOption: (field: keyof SearchOption, value: SearchOption[typeof field]) => void;
};

const GradeSelectForm = (props: Props) => {
  const { selectedGrades, changeSearchOption } = props;
  return (
    <FormControl>
      <FormLabel>학년</FormLabel>
      <CheckboxGroup
        value={selectedGrades}
        onChange={(value) => changeSearchOption("grades", value.map(Number))}
      >
        <HStack spacing={4}>
          {[1, 2, 3, 4].map((grade) => (
            <Checkbox key={grade} value={grade}>
              {grade}학년
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
    </FormControl>
  );
};
export default memo(GradeSelectForm);
