export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input type="number" id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group" defaultValue="assignments">
              <option value="assignments">ASSIGNMENTS</option>
              <option value="quizzes">QUIZZES</option>
              <option value="exams">EXAMS</option>
              <option value="projects">PROJECTS</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display" defaultValue="percentage">
              <option value="percentage">Percentage</option>
              <option value="points">Points</option>
              <option value="letter">Letter Grade</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission" defaultValue="online">
              <option value="online">Online</option>
              <option value="paper">On Paper</option>
            </select>
            <br />
            <label htmlFor="wd-entry">Online Entry Options</label>
            <br />
            <input type="checkbox" name="wd-entry" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input type="checkbox" name="wd-entry" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input type="checkbox" name="wd-entry" id="wd-media-recording" />
            <label htmlFor="wd-media-recording">Media Recordings</label>
            <br />
            <input type="checkbox" name="wd-entry" id="wd-student" />
            <label htmlFor="wd-student">Student Annotation</label>
            <br />
            <input type="checkbox" name="wd-entry" id="wd-file" />
            <label htmlFor="wd-file">File Uploads</label>
            <br />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign To:</label>
            <br />
            <input type="text" id="wd-assign-to" defaultValue="Everyone" />
          </td>
          <td>
            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input type="date" id="wd-due-date" defaultValue="2026-01-01" />
          </td>
          <td>
            <label htmlFor="wd-available-date">Available From:</label>
            <br />
            <input
              type="date"
              id="wd-available-date"
              defaultValue="2025-12-01"
            />
          </td>
          <td>
            <label htmlFor="wd-until">Until:</label>
            <br />
            <input type="date" id="wd-until" defaultValue="2026-02-01" />
          </td>
        </tr>
        <tr>
          <td colSpan={5} align="right" valign="top">
            <button id="wd-cancel">Cancel</button>
            &nbsp;
            <button id="wd-save">Save</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
