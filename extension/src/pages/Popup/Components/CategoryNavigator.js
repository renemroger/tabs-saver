import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OpenButton from './OpenButton';
import './CategoryNavigator.css';

const useStyles = makeStyles({
  span: {
    float: 'left',
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
                  <a key={key}>
                    {category} <span className={classes.span}>{'<'}</span>
                  </a>
                </li>
              </ul>
              {props.groups.map((group, index) => {
                return (
                  group.category === category && (
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
                  )
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
