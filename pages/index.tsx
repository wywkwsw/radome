import styles from "./index.module.scss";
import { useEffect, useState, useRef } from "react";
import classnames from "classnames";
import { clearInterval } from "timers";
export default function Index() {
  // 获取div盒子与顶部的高度
  const [containerList, setContainerList] = useState([]);

  //滚动距离
  const [scrollHeight, setScrollHeight] = useState(0);

  //获取页面div高度
  function getHeight() {
    const containerHeight = document.querySelectorAll(".homeBackground__theme");
    const hightList = Array.from(containerHeight).map(
      (v: HTMLElement, index) => {
        return v.offsetTop;
      }
    );
    setContainerList(hightList);
    console.log("hightList", hightList);
  }

  function setScroll() {
    setScrollHeight(window.pageYOffset);
  }
  //添加页面滚动监听
  function addScrol() {
    if (window) {
      window.addEventListener("scroll", setScroll);
    }
  }
  function addResize() {
    if (window) {
      window.addEventListener("resize", () => {
        getHeight();
      });
    }
  }
  // 小背景颜色
  function getBackGroundColor(step: number) {
    if (
      containerList[step + 1] > scrollHeight &&
      containerList[step] < scrollHeight
    ) {
      return "homeBackground__theme-active";
    }
  }

  // header添加class
  function headerAddClass() {
    if (scrollHeight > containerList[1] - 80) {
      return styles.containerHeaderFix;
    }
    return "";
  }

  const box1 = useRef(null);

  // 记录动画以过度步数
  let animationCount: number = 0
  // 正向动画计时器
  let interval: number = 0
  // 反向动画计时器
  let reverseInterval: number = 0
  function animation (value?:HTMLElement) {
    const EL = box1.current
    // EL.style.transform = 'translateY(-50px)'
    // console.log()
    interval = window.setInterval(() => {
      EL.style.transform = `translateY(-${++animationCount * 2}px)`
      if (animationCount >= 50) {
        window.clearInterval(interval)
      }
    }, 50)
  }
  useEffect(() => {
    let isUnmounted = false;
    // 挂载组件
    if (!isUnmounted) {
      getHeight();
      addScrol();
      addResize();
    } else {
      //销毁组件s
      window.removeEventListener("scroll", setScroll);
    }
    return () => {
      isUnmounted = true;
    };
  }, []);
  return (
    <div className="container">
      <header className={classnames(styles.containerHeader, headerAddClass())}>
        <div className={styles.containerHeaderBox}>
          <div className="containerHeader-left">icon</div>
          <div className="containerHeader-right">
            <div
              className="login-button"
              onClick={() => {
                console.log("box1", box1.current.getBoundingClientRect());
                animation()
              }}
            >
              Login
            </div>
            <div className="join-button">JOIN US</div>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.Home}>
          <div className="homeBackground">
            <div
              className={classnames("homeBackground__theme__background-box")}
            >
              <div
                className={classnames(
                  "homeBackground__theme__background homeBackground__theme__green",
                  getBackGroundColor(1)
                )}
              ></div>
              <div
                className={classnames(
                  "homeBackground__theme__background homeBackground__theme__dark-1",
                  getBackGroundColor(2)
                )}
              ></div>
              <div
                className={classnames(
                  "homeBackground__theme__background homeBackground__theme__dark-2",
                  getBackGroundColor(3)
                )}
              ></div>
              <div
                className={classnames(
                  "homeBackground__theme__background homeBackground__theme__dark-3",
                  getBackGroundColor(4)
                )}
              ></div>
            </div>
            <div className={classnames("homeBackground__theme")}>
              <video
                width="100%"
                height="100%"
                autoPlay
                muted
                playsInline={true}
                loop={true}
              >
                <source src="/Supercell.mp4" type="video/mp4" />
              </video>
            </div>
            <div
              className={classnames(
                "homeBackground__theme",
                "homeBackground__theme-1",
                containerList[0] < 0
                  ? "homeBackground__theme__green__active"
                  : ""
              )}
            >
              <div
                ref={box1}
                className={classnames("homeBackground__theme-1-box")}
              >
                <div
                  className={classnames("homeBackground__theme-1-box-title")}
                >
                  CREATORS IS
                </div>
                <div
                  className={classnames("homeBackground__theme-1-box-context")}
                >
                  <span>THE ONLY PLACE TO GET </span>
                  <span>EXCLUSIVE SNEAK PEEKS,&nbsp;</span>
                  <span>TOOLS,</span>
                  <span> AND </span>
                  <span>SUPPORT</span>
                  <span> FROM </span>
                  <span>SUPERCELL</span>
                  <span> TO HELP YOU</span>
                  <span>CREATE!</span>
                </div>
              </div>
            </div>
            <div
              className={classnames(
                "homeBackground__theme",
                containerList[1] < 0
                  ? "homeBackground__theme__dark-1__active"
                  : ""
              )}
            ></div>
            <div
              className={classnames(
                "homeBackground__theme",
                containerList[2] < 0
                  ? "homeBackground__theme__dark-2__active"
                  : ""
              )}
            ></div>
            <div
              className={classnames(
                "homeBackground__theme",
                containerList[3] < 0
                  ? "homeBackground__theme__dark-3__active"
                  : ""
              )}
            ></div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
