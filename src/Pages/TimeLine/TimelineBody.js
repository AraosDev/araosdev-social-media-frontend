/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Loader } from "../../Common/DataTransitionHandlers";
import Card from "react-bootstrap/Card";
import {
  getTimeLineImagesAction,
  updateImgCommentAction,
  updateLikeCountAction,
} from "../../Store/actions/timelineActions";
import ProfileIcon from "../../Common/ProfileIcon";
import { BsHeart, BsFillHeartFill, BsChat } from "react-icons/bs";
import { didCurrentUserLiked } from "./HelperFns";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { currentUser, unixTimeToReadableFormat } from "../../Common/helperFns";
import Badge from "react-bootstrap/Badge";

const StyledTimelineBody = styled.div`
  max-height: calc(100vh - 85px);
  overflow: auto;
  .timeline-body-container {
    background-color: rgb(204, 204, 255);
    border-left: 1px solid rgb(93, 63, 211) !important;
    border-right: 1px solid rgb(93, 63, 211) !important;
    width: 750px;
    .loader-element {
      height: calc(100vh - 85px);
    }
    .list-grp-custom-cls {
      border: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 5px;
      background-color: white;
    }
    .form-control {
      border-bottom: 1px solid #ced4da !important;
      border: 0px;
      border-radius: 0px !important;
    }
    .form-control:focus {
      box-shadow: 0 1px rgb(204 204 255);
      border-bottom: 1px solid rgb(204, 204, 255) !important;
    }
    .profile-comment {
      flex: 1;
    }
    .bg-primary {
      background-color: rgb(204, 204, 255) !important;
      border: 1px solid rgb(93, 63, 211) !important;
    }
  }
`;

function TimelineBody() {
  const dispatch = useDispatch();
  const { timelineState, timelineImages } = useSelector(
    (state) => state.timelineReducer
  );

  const [openedCommentSectImgs, setOpenCommentSecImgs] = useState([]);
  const [newCommentInImgs, setNewCommentInImgs] = useState([]);

  useEffect(() => {
    dispatch(getTimeLineImagesAction());
  }, []);

  const updateLikeCount = (imgDetail, flag) => {
    dispatch(updateLikeCountAction(imgDetail, flag));
  };

  const openCommentSection = (imgDetail) => {
    const { _id } = imgDetail;
    if (openedCommentSectImgs.includes(_id))
      setOpenCommentSecImgs([
        ...openedCommentSectImgs.filter((id) => id !== _id),
      ]);
    else setOpenCommentSecImgs([...openedCommentSectImgs, _id]);
  };

  const updateComment = (imgDetail) => {
    const comment = newCommentInImgs.find(
      ({ id }) => imgDetail._id === id
    ).comment;
    if (comment)
      dispatch(
        updateImgCommentAction(imgDetail, comment, () => {
          setNewCommentInImgs(
            newCommentInImgs.filter(({ id }) => imgDetail._id !== id)
          );
        })
      );
    else return;
  };

  const getCurrentCommentValue = (imgDetail) => {
    let { comment = "" } =
      newCommentInImgs.find(({ id }) => imgDetail._id === id) || {};
    if (comment) return comment;
    else return "";
  };

  const getTimelineContent = () => {
    switch (timelineState) {
      case "TIMELINE_LOADING":
        return (
          <Loader
            className="loader-element caveatBold"
            message="Loading your feeds . . ."
          />
        );

      case "TIMELINE_LOADED":
        return (
          <div className="py-3">
            {timelineImages.map((image, index) => (
              <Card
                key={image._id}
                className={`${
                  index === timelineImages.length - 1 ? "" : "mb-4"
                }`}
              >
                <Card.Header className="d-flex">
                  <ProfileIcon
                    iconText={image.userName.charAt(0).toUpperCase()}
                  />
                  <div
                    className="d-flex flex-column ms-2"
                    style={{ fontSize: 13, fontWeight: 700 }}
                  >
                    <span>{image.userName}</span>
                    <span>{image.postedDate}</span>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-3">
                    {image.caption}
                  </Card.Subtitle>
                  <Card.Img
                    style={{ width: "100%", height: 600, objectFit: "cover" }}
                    src={image.imageLink}
                  />
                </Card.Body>
                <Card.Footer>
                  {didCurrentUserLiked(image.likedBy) ? (
                    <BsFillHeartFill
                      onClick={() => updateLikeCount(image, "DECREMENT")}
                      size={25}
                      className="me-2 cursor-pointer"
                      color="red"
                    />
                  ) : (
                    <BsHeart
                      onClick={() => updateLikeCount(image, "INCREMENT")}
                      size={25}
                      className="me-2 cursor-pointer"
                    />
                  )}
                  {image.likes} likes
                  <BsChat
                    onClick={() => openCommentSection(image)}
                    size={24}
                    className="mx-2 cursor-pointer"
                  />
                  {image.commentSection.length} comments
                  {openedCommentSectImgs.includes(image._id) ? (
                    <ListGroup className="my-2 p-2 list-grp-custom-cls list-group-flush">
                      {image.commentSection.map((comment) => (
                        <ListGroup.Item className="d-flex">
                          <ProfileIcon
                            iconText={comment.userName.charAt(0).toUpperCase()}
                            iconSize="28px"
                          />
                          <span
                            className="ms-2 d-flex justify-content-between"
                            style={{ fontSize: 14, width: "100%" }}
                          >
                            <div>
                              <span style={{ fontWeight: "bold" }}>
                                {comment.userName}:
                              </span>
                              <span>&nbsp;{comment.comment}</span>
                            </div>
                            <span
                              className="ms-2"
                              style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {unixTimeToReadableFormat(comment.commentedOn)}
                            </span>
                          </span>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item className="d-flex">
                        <ProfileIcon
                          iconText={currentUser().charAt(0).toUpperCase()}
                          iconSize="28px"
                          className="me-2 profile-comment"
                        />
                        <Form.Control
                          style={{ flex: 20 }}
                          placeholder="Add your comment"
                          value={getCurrentCommentValue(image)}
                          onChange={(e) => {
                            if (
                              newCommentInImgs.some(
                                ({ id }) => image._id === id
                              )
                            ) {
                              let updateCommentImgs = [...newCommentInImgs];
                              updateCommentImgs.splice(
                                newCommentInImgs.findIndex(
                                  ({ id }) => image._id === id
                                ),
                                1,
                                {
                                  id: image._id,
                                  comment: e.target.value,
                                }
                              );
                              setNewCommentInImgs(updateCommentImgs);
                            } else {
                              setNewCommentInImgs([
                                ...newCommentInImgs,
                                {
                                  id: image._id,
                                  comment: e.target.value,
                                },
                              ]);
                            }
                          }}
                        />
                        <div style={{ flex: 2 }}>
                          <Badge
                            className="ms-2 cursor-pointer"
                            text="dark"
                            style={{ background: "rgb(204,204,255)" }}
                            onClick={() => updateComment(image)}
                          >
                            Post
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  ) : (
                    <></>
                  )}
                </Card.Footer>
              </Card>
            ))}
          </div>
        );
      default:
        return;
    }
  };

  return (
    <StyledTimelineBody>
      <Container className="timeline-body-container">
        {getTimelineContent()}
      </Container>
    </StyledTimelineBody>
  );
}

export default TimelineBody;
