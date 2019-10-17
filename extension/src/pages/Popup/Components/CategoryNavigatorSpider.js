import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OpenButton from './OpenButton';
import './CategoryNavigatorSpider.css';

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
            <div className="dropdown">
              <ul>
                <li>
                  <a key={key}>{category}</a>
                </li>
              </ul>

              {props.groups.map((group, index) => {
                console.log(group);
                return (
                  <div className="dropdown-content">
                    <ul className="vertical">
                      <li>
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
                      </li>
                    </ul>
                    <OpenButton
                      key={index}
                      group={group}
                      index={index}
                    ></OpenButton>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
