import { Paper, SvgIcon, Tooltip, Typography } from "@material-ui/core";
import { Check, Report } from "@material-ui/icons";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import React from "react";
import { RoadmapItemType } from "../../../../../@types";

const RoadmapItem = ({
  label = "label test",
  complete,
  last,
}: RoadmapItemType) => {
  return (
    <TimelineItem style={{ minHeight: "125px" }}>
      <TimelineSeparator>
        <TimelineDot style={{ backgroundColor: complete ? "#019b46" : "gray" }}>
          <Tooltip title={complete ? "Implementado" : "Em desenvolvimento"}>
            <SvgIcon component={complete ? Check : Report} />
          </Tooltip>
        </TimelineDot>
        <TimelineConnector
          style={{ backgroundColor: last ? "transparent" : "#cacaca" }}
        />
      </TimelineSeparator>
      <TimelineContent>
        <Paper
          elevation={complete ? 3 : 1}
          style={{
            padding: "6px 16px",
            backgroundColor: complete ? "initial" : "#cacaca",
          }}
        >
          <Typography
            style={{ color: complete ? "333" : "#7e7e7e" }}
            align="center"
            variant="h6"
            component="h1"
          >
            {label}
          </Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
};

export default RoadmapItem;
