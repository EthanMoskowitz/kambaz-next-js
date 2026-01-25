import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1365" className="wd-dashboard-course-link">
            <Image src="/images/math.jpg" width={200} height={150} alt="math" />
            <div>
              <h5> MATH1365 </h5>
              <p className="wd-dashboard-course-title">
                Introduction to Math Reasoning
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1134" className="wd-dashboard-course-link">
            <Image
              src="/images/guitar.jpg"
              width={200}
              height={150}
              alt="music"
            />
            <div>
              <h5> MUSC1134 </h5>
              <p className="wd-dashboard-course-title">Guitar Class</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1001" className="wd-dashboard-course-link">
            <Image
              src="/images/music.jpg"
              width={300}
              height={150}
              alt="music"
            />
            <div>
              <h5> MUSC1001 </h5>
              <p className="wd-dashboard-course-title">
                Music in Everyday Life
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1145" className="wd-dashboard-course-link">
            <Image
              src="/images/values.jpg"
              width={200}
              height={150}
              alt="philosophy"
            />
            <div>
              <h5> PHIL1145 </h5>
              <p className="wd-dashboard-course-title">
                Technology and Human Values
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1101" className="wd-dashboard-course-link">
            <Image
              src="/images/communication.jpg"
              width={300}
              height={150}
              alt="communication"
            />
            <div>
              <h5> COMM1101 </h5>
              <p className="wd-dashboard-course-title">
                Intro Communication Studies
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1112" className="wd-dashboard-course-link">
            <Image
              src="/images/speaking.jpg"
              width={300}
              height={150}
              alt="communication"
            />
            <div>
              <h5> COMM1112 </h5>
              <p className="wd-dashboard-course-title">Public Speaking</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
