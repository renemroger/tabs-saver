import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OpenButton from './OpenButton';

const useStyles = makeStyles({
  root: {
    paddingTop: 30,
  },
});

export default function CategoryNavigatorSpider(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      {props.categories.map((category, key) => {
        return (
          <React.Fragment>
            {props.groups.map((group, index) => {
              return (
                <React.Fragment>
                  <a
                    onClick={() => {
                      chrome.runtime.sendMessage(
                        { directive: 'open-click', groupId: group.id },
                        function(response) {
                          //this.close();
                        }
                      );
                    }}
                  >
                    Open Tab
                  </a>
                  <OpenButton
                    key={index}
                    group={group}
                    index={index}
                  ></OpenButton>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
