import * as React from 'react';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const LogoBr = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={140}
    height={42}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M92.193 2.846c.987 1.433 1.515 3.427.803 5.325a2.255 2.255 0 1 1-4.223-1.584c.068-.181.082-.636-.295-1.184-.359-.52-.89-.842-1.426-.886-.471-.039-1.344.107-2.481 1.332-1.117 1.202-2.392 3.364-3.532 7.013 1.028-.218 1.99-.423 2.759-.588a2.256 2.256 0 0 1 .944 4.411c-1.297.278-3.23.689-5.1 1.082A251.25 251.25 0 0 0 78 24.246c-.206.855-.404 1.688-.595 2.493-.127.534-.25 1.055-.373 1.564 2.48-.464 5.317-1.018 8.207-1.654 1.3-.285 2.605-.586 3.89-.901.169-2.29.99-4.686 2.538-6.97 3.975-5.867 9.263-7.461 13.149-5.511 1.851.928 3.229 2.662 3.488 4.791.265 2.178-.684 4.337-2.628 6.028-1.87 1.626-4.996 2.941-8.305 4.028-1.054.347-2.16.68-3.299 1 .178.445.4.852.658 1.215 1.393 1.963 4.165 3.136 7.848 1.663 1.802-.72 3.277-2.024 4.978-3.793.325-.338.661-.696 1.01-1.068 1.393-1.486 2.988-3.189 4.883-4.649 2.454-1.89 5.475-3.448 9.551-4.082 4.038-.63 8.989-.333 15.301 1.278a2.255 2.255 0 1 1-1.116 4.37c-5.911-1.508-10.224-1.7-13.491-1.191-3.23.503-5.557 1.708-7.492 3.199-1.577 1.215-2.855 2.576-4.22 4.03h-.001l-.002.003c-.381.405-.768.818-1.171 1.237-1.769 1.84-3.804 3.754-6.554 4.854-5.419 2.167-10.483.592-13.203-3.24a10.43 10.43 0 0 1-1.37-2.684c-1.158.28-2.323.546-3.474.8-3.795.833-7.484 1.527-10.393 2.06-.595 2.135-1.245 4.038-2.096 5.457-.944 1.573-2.41 2.97-4.629 2.97-1.68 0-3.169-.629-4.115-1.92-.887-1.21-1.05-2.667-.883-3.901.318-2.371 2.03-5.096 4.92-5.891.534-.147 1.677-.365 3.164-.638.26-1.055.532-2.195.823-3.423v-.003l.002-.004c.194-.818.398-1.676.614-2.574.335-1.388.696-2.86 1.095-4.408-.254.049-.45.085-.577.106a2.255 2.255 0 1 1-.724-4.453c.335-.054 1.332-.255 2.619-.52.168-.59.342-1.188.522-1.794 1.29-4.344 2.897-7.382 4.715-9.34C83.117.783 85.271-.156 87.42.02c2.085.172 3.768 1.365 4.773 2.826Zm-21.38 31.197c-.27.055-.473.1-.605.137-.354.098-.728.347-1.053.767a2.98 2.98 0 0 0-.593 1.375c-.028.215-.019.38.003.49a.591.591 0 0 0 .046.142.182.182 0 0 0 .02.01c.038.017.173.068.459.068a.254.254 0 0 0 .18-.06c.107-.078.312-.271.58-.72.32-.531.635-1.258.963-2.21Zm23.094-9.575a70.482 70.482 0 0 0 2.057-.64c3.295-1.082 5.633-2.172 6.753-3.146 1.047-.91 1.16-1.67 1.11-2.078-.055-.456-.369-.972-1.033-1.305-1.142-.573-4.175-.737-7.392 4.01-.734 1.083-1.218 2.147-1.495 3.16ZM50.817 4.635c.441 1.464.247 3.106-.44 4.81-.775 1.92-2.309 3.553-4.079 4.86-1.617 1.194-3.554 2.21-5.627 2.996l-.196.53c-2.084 5.66-4.367 12.102-5.953 16.878.604-.06 1.352-.184 2.224-.395 3.393-.82 7.716-2.723 10.757-5.607 3.331-3.158 5.745-7.052 6.667-10.177.466-1.58.483-2.73.284-3.43-.155-.544-.43-.859-1.071-1.034a2.255 2.255 0 1 1 1.187-4.352c2.219.605 3.65 2.143 4.222 4.15.528 1.85.293 3.949-.295 5.943-1.187 4.022-4.095 8.575-7.89 12.174-3.765 3.57-8.874 5.769-12.801 6.718-1.932.467-3.821.692-5.241.496-.623-.086-1.698-.319-2.447-1.182a2.812 2.812 0 0 1-.693-1.856c0-.526.143-.983.317-1.35 1.398-4.304 3.532-10.392 5.592-16.053-3.416.585-6.988.544-10.108-.466-7.31-2.367-12.203-1-15.407.884-1.645.967-2.914 2.112-3.874 3.105-.426.44-.781.838-1.101 1.197l-.13.147c-.17.19-.347.387-.512.557-.145.149-.38.383-.659.578A2.255 2.255 0 0 1 .9 21.102l.063-.063c.093-.096.214-.23.386-.423l.124-.139c.318-.357.736-.826 1.231-1.338 1.133-1.17 2.719-2.615 4.83-3.856 4.308-2.533 10.537-4.053 19.082-1.287 2.991.969 6.903.77 10.578-.288a368.37 368.37 0 0 1 2.228-5.837c.445-1.132.84-2.107 1.163-2.863.295-.69.597-1.363.847-1.763.756-1.21 1.99-1.848 3.12-2.089a5.737 5.737 0 0 1 3.581.39 4.939 4.939 0 0 1 2.686 3.089Zm-7.815 6.472c.215-.559.422-1.089.617-1.584.438-1.114.815-2.044 1.114-2.743.15-.35.274-.63.373-.842.07-.15.115-.235.136-.276a.678.678 0 0 1 .25-.094c.264-.056.546-.021.739.068.15.07.223.153.267.299.056.188.132.74-.305 1.822-.349.865-1.18 1.89-2.575 2.92-.197.145-.403.289-.616.43Zm-9.986 23.585c.002 0 .016.003.042.013a.152.152 0 0 1-.042-.013Zm33.586-22.795a2.255 2.255 0 0 1 1.531 2.798L61.892 36.02a2.255 2.255 0 0 1-4.33-1.267l6.242-21.325a2.255 2.255 0 0 1 2.798-1.53Zm1.317-3.287a2.87 2.87 0 1 0 0-5.742 2.87 2.87 0 0 0 0 5.742Z"
      clipRule="evenodd"
    />
    <Circle cx={67.919} cy={5.739} r={2.871} fill="#FFD600" />
    <Defs>
      <LinearGradient
        id="a"
        x1={110.647}
        x2={136.755}
        y1={19.27}
        y2={18.648}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#002BFF" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default LogoBr;
