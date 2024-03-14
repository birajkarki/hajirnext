import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useCountUp } from "use-count-up";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const DailyGraphPerformanceReport = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLabel, setButtonLabel] = React.useState("Start");

  const { value: value1, reset: resetValue1 } = useCountUp({
    isCounting: isLoading,
    duration: 1,
    start: 0,
    end: 95,
    onComplete: () => {
      setIsLoading(false);
      setButtonLabel("Reset");
    },
  });

  const { value: value2, reset: resetValue2 } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: 75,
  });

  const handleButtonClick = () => {
    if (isLoading || buttonLabel === "Reset") {
      setIsLoading(false);
      setButtonLabel("Start");
      resetValue1();
    } else {
      setIsLoading(true);
      setButtonLabel("Reset");
    }
  };

  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={8}>
      <Stack spacing={2}>
        <CircularProgress size="lg" variant="determinate" value={value1}>
          <Typography>{value1}%</Typography>
        </CircularProgress>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleButtonClick}
        >
          {buttonLabel}
        </Button>
      </Stack>
      {/* <Stack spacing={2}>
        <CircularProgress size="lg" variant="determinate" value={value2}>
          <Typography>{value2}%</Typography>
        </CircularProgress>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => resetValue2()}
        >
          Reload
        </Button>
      </Stack> */}
    </Stack>
  );
};

export default DailyGraphPerformanceReport;
