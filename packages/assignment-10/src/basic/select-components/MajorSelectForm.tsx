import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
} from "@chakra-ui/react";
import { SearchOption } from "../SearchDialog";
import { memo } from "react";

type Props = {
  selectedMajors: string[];
  allMajors: string[];
  changeSearchOption: (field: keyof SearchOption, value: SearchOption[typeof field]) => void;
};
const MajorSelectForm = (props: Props) => {
  const { selectedMajors, allMajors, changeSearchOption } = props;

  return (
    <FormControl>
      <FormLabel>전공</FormLabel>
      <CheckboxGroup
        colorScheme="green"
        value={selectedMajors}
        onChange={(values) => changeSearchOption("majors", values as string[])}
      >
        <Wrap spacing={1} mb={2}>
          {selectedMajors.map((major) => (
            <Tag key={major} size="sm" variant="outline" colorScheme="blue">
              <TagLabel>{major.split("<p>").pop()}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  changeSearchOption(
                    "majors",
                    selectedMajors.filter((v) => v !== major)
                  )
                }
              />
            </Tag>
          ))}
        </Wrap>
        <Stack
          spacing={2}
          overflowY="auto"
          h="100px"
          border="1px solid"
          borderColor="gray.200"
          borderRadius={5}
          p={2}
        >
          {allMajors.map((major) => (
            <Box key={major}>
              <Checkbox key={major} size="sm" value={major}>
                {major.replace(/<p>/gi, " ")}
              </Checkbox>
            </Box>
          ))}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
};

export default memo(MajorSelectForm);
