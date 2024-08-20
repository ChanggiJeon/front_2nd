import { Button, ButtonGroup, Flex, Heading, Stack } from "@chakra-ui/react";
import ScheduleTable from "./ScheduleTable.tsx";
import { useScheduleContext } from "./ScheduleContext.tsx";
import SearchDialog from "./SearchDialog.tsx";
import { memo, useEffect, useState } from "react";
import { Lecture, Schedule } from "./types.ts";
import axios, { AxiosResponse } from "axios";

const fetchMajors = (() => {
  let axiosResult: Promise<AxiosResponse<Lecture[]>> | null = null;
  return () => {
    if (!axiosResult) {
      axiosResult = axios.get<Lecture[]>("/schedules-majors.json");
    }
    return axiosResult;
  };
})();
const fetchLiberalArts = (() => {
  let axiosResult: Promise<AxiosResponse<Lecture[]>> | null = null;
  return () => {
    if (!axiosResult) {
      axiosResult = axios.get<Lecture[]>("/schedules-liberal-arts.json");
    }
    return axiosResult;
  };
})();

const fetchAllLectures = async () =>
  await Promise.all([
    (console.log("API Call 1", performance.now()), fetchMajors()),
    (console.log("API Call 2", performance.now()), fetchLiberalArts()),
    (console.log("API Call 3", performance.now()), fetchMajors()),
    (console.log("API Call 4", performance.now()), fetchLiberalArts()),
    (console.log("API Call 5", performance.now()), fetchMajors()),
    (console.log("API Call 6", performance.now()), fetchLiberalArts()),
  ]);

export const ScheduleTables = () => {
  const { schedulesMap, setSchedulesMap } = useScheduleContext();
  const [searchInfo, setSearchInfo] = useState<{
    tableId: string;
    day?: string;
    time?: number;
  } | null>(null);

  const disabledRemoveButton = Object.keys(schedulesMap).length === 1;

  const duplicate = (targetId: string) => {
    setSchedulesMap((prev) => ({
      ...prev,
      [`schedule-${Date.now()}`]: [...prev[targetId]],
    }));
  };

  const remove = (targetId: string) => {
    setSchedulesMap((prev) => {
      delete prev[targetId];
      return { ...prev };
    });
  };

  type Props = {
    tableId: string;
    schedules: Schedule[];
    index: number;
  };
  const MemoScheduleTable = memo(({ tableId, schedules, index }: Props) => {
    return (
      <Stack key={tableId} width="600px">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h3" fontSize="lg">
            시간표 {index + 1}
          </Heading>
          <ButtonGroup size="sm" isAttached>
            <Button colorScheme="green" onClick={() => setSearchInfo({ tableId })}>
              시간표 추가
            </Button>
            <Button colorScheme="green" mx="1px" onClick={() => duplicate(tableId)}>
              복제
            </Button>
            <Button
              colorScheme="green"
              isDisabled={disabledRemoveButton}
              onClick={() => remove(tableId)}
            >
              삭제
            </Button>
          </ButtonGroup>
        </Flex>
        <ScheduleTable
          key={`schedule-table-${index}`}
          schedules={schedules}
          tableId={tableId}
          onScheduleTimeClick={(timeInfo) => setSearchInfo({ tableId, ...timeInfo })}
          onDeleteButtonClick={({ day, time }) =>
            setSchedulesMap((prev) => ({
              ...prev,
              [tableId]: prev[tableId].filter(
                (schedule) => schedule.day !== day || !schedule.range.includes(time)
              ),
            }))
          }
        />
      </Stack>
    );
  });

  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    fetchAllLectures().then((results) => {
      setLectures(results.flatMap((result) => result.data));
    });
  }, []);

  return (
    <>
      <Flex w="full" gap={6} p={6} flexWrap="wrap">
        {Object.entries(schedulesMap).map(([tableId, schedules], index) => (
          <MemoScheduleTable key={tableId} tableId={tableId} schedules={schedules} index={index} />
        ))}
      </Flex>
      <SearchDialog
        lectures={lectures}
        searchInfo={searchInfo}
        onClose={() => setSearchInfo(null)}
      />
    </>
  );
};
