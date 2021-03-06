import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount() {
    const { courses, authors, loadCourses, loadAuthors } = this.props;
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert('Loading courses failed' + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert('Loading authors failed' + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          style={{marginBottom: 20}}
          className="btn btn-primary add-course"
          onClick={() => this.setState({redirectToAddCoursePage: true})}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
        </>
    )
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
        return {
          ...course,
          authorName: state.authors.find(a => a.id === course.authorId).name
        }
      }),
    authors: state.authors
  };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,

}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
