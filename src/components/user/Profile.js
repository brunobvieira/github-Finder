import React, {useEffect, useContext, Fragment} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import NotFound from "../pages/NotFound";

import UserContext from "../../context/user/UserContext";

const Profile = ({param}) => {

    /**
     * Context
     */
    const {user, getUser, repos, getUserRepos, loading} = useContext(UserContext);

    useEffect(() => {
        getUser(param);
        getUserRepos(param);
        // eslint-disable-next-line
    }, []);

    if (loading) return <Spinner/>;

    if (user === null) {
        return (
            <Fragment>
                <NotFound/>
            </Fragment>
        );
    }

    const {
        name,
        avatar_url,
        location,
        company,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;

    return (
        <Fragment>
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt={name} className="round-img" style={{width: "150px"}}/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                    <p>Hireble: {hireable ?
                        (<i className="fas fa-check text-success"/>) :
                        (<i className="fas fa-times-circle text-danger"/>)}
                    </p>
                </div>
                <div>
                    {bio && <Fragment><h3>Bio</h3><p>{bio}</p></Fragment>}
                    <a href={html_url} className="btn btn-dark my-1">Visit github profile</a>
                    <ul>
                        <li><strong>Username: </strong> {login}</li>
                        <li>{company && <Fragment><strong>Company: </strong>{company}</Fragment>}</li>
                        <li>{blog && <Fragment><strong>Website: </strong>{blog}</Fragment>}</li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-dark">Public Repos: {public_repos}</div>
                <div className="badge badge-light">Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos}/>
            <Link to="/" className="btn btn-light">Back to search</Link>
        </Fragment>
    );
};

/**
 * Proptypes definition
 * @type {{alert: *}}
 */
Profile.propTypes = {
    param: PropTypes.string.isRequired,
};

export default Profile;