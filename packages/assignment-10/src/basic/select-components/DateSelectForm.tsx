import { Checkbox, CheckboxGroup, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import { SearchOption } from "../SearchDialog";
import { DAY_LABELS } from "../constants";
import { memo } from "react";

type Props = {
  selectedDays: string[];
  changeSearchOption: (field: keyof SearchOption, value: SearchOption[typeof field]) => void;
};

const DateSelectForm = (props: Props) => {
  const { selectedDays, changeSearchOption } = props;
  return (
    <FormControl>
      <FormLabel>요일</FormLabel>
      <CheckboxGroup
        value={selectedDays}
        onChange={(value) => changeSearchOption("days", value as string[])}
      >
        <HStack spacing={4}>
          {DAY_LABELS.map((day) => (
            <Checkbox key={day} value={day}>
              {day}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
    </FormControl>
  );
};

export default memo(DateSelectForm);
