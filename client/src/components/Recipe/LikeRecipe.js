import React from "react";

import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import { Mutation } from "react-apollo";

import withSession from "../withSession";

import { LIKE_RECIPE, GET_RECIPE } from "../../queries";

class LikeRecipe extends React.Component {
  state = {
    username: "",
    liked: false
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      this.setState({ username: this.props.session.getCurrentUser.username });
      const found = this.props.session.getCurrentUser.favorites.filter(f => {
        return f._id === this.props.recipe._id;
      });
      this.setState({ liked: found.length > 0 });
    }
  }

  handleClick = likeRecipe => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => {
        this.handleLike(likeRecipe);
      }
    );
  };

  handleLike = likeRecipe => {
    if (!this.state.liked) {
      likeRecipe()
        .then(async ({ data }) => {
          await this.props.refetch();
        })
        .catch(err => console.log(err));
    } else {
      console.log("unlike");
    }
  };

  updateLike = (proxy, { data: { likeRecipe } }) => {
    try {
      const { recipe } = this.props;
      const { getRecipe } = proxy.readQuery({
        query: GET_RECIPE,
        variables: { _id: recipe._id }
      });

      proxy.writeQuery({
        query: GET_RECIPE,
        variables: { _id: recipe._id },
        data: {
          getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
        }
      });
    } catch (err) {
      console.log("error");
    }
  };

  render() {
    const { username } = this.state;
    const { recipe } = this.props;
    return (
      <Mutation
        mutation={LIKE_RECIPE}
        variables={{ _id: recipe._id, username: username }}
        update={this.updateLike}
      >
        {likeRecipe =>
          username && (
            <IconButton
              color={this.state.liked ? "secondary" : "primary"}
              onClick={() => {
                this.handleClick(likeRecipe);
              }}
            >
              <FavoriteIcon />
            </IconButton>
          )
        }
      </Mutation>
    );
  }
}

export default withSession(LikeRecipe);
