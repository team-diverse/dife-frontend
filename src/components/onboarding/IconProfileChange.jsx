import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const IconProfileChange = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={98}
		height={114}
		fill="none"
		{...props}
	>
		<Rect
			width={94}
			height={110}
			x={2}
			y={2}
			fill="#fff"
			fillOpacity={0.5}
			rx={20}
		/>
		<Rect
			width={94}
			height={110}
			x={2}
			y={2}
			stroke="#2964E0"
			strokeDasharray="5 13"
			strokeLinecap="round"
			strokeWidth={4}
			rx={20}
		/>
		<Path
			fill="#2964E0"
			fillRule="evenodd"
			d="M42.944 52.188a3.753 3.753 0 0 1-3.749-3.748 3.754 3.754 0 0 1 3.75-3.752 3.757 3.757 0 0 1 3.75 3.752 3.755 3.755 0 0 1-3.75 3.748Zm-.001-5.063a1.313 1.313 0 1 0 1.314 1.315c0-.725-.59-1.313-1.314-1.315Z"
			clipRule="evenodd"
		/>
		<Path
			fill="#2964E0"
			d="M38.862 61.605a1.218 1.218 0 0 1-1.09-1.758c.17-.343 1.73-3.338 4.331-3.338 1.34 0 2.32.728 3.108 1.316.767.57 1.269.919 1.924.919.463-.007 1.663-1.452 2.309-2.23 1.376-1.657 2.801-3.373 4.616-3.373 3.11 0 5.044 4.135 5.254 4.607a1.217 1.217 0 0 1-.616 1.607 1.218 1.218 0 0 1-1.61-.613c-.464-1.032-1.816-3.164-3.028-3.164-.67 0-1.911 1.495-2.735 2.486l-.006.007c-1.328 1.6-2.582 3.11-4.184 3.11-1.495 0-2.54-.777-3.379-1.4-.695-.516-1.145-.834-1.653-.834-.869 0-1.823 1.339-2.15 1.985a1.22 1.22 0 0 1-1.091.673Z"
		/>
		<Path
			fill="#2964E0"
			fillRule="evenodd"
			d="M32.25 53.145c0 11.997 4.253 16.25 16.25 16.25s16.25-4.253 16.25-16.25c0-11.998-4.253-16.25-16.25-16.25s-16.25 4.252-16.25 16.25Zm2.438 0c0-10.586 3.227-13.813 13.812-13.813 10.585 0 13.813 3.227 13.813 13.813 0 10.585-3.228 13.812-13.813 13.812S34.687 63.73 34.687 53.145ZM66.96 32.2c.446 0 .809.361.809.808v3.14h3.143a.809.809 0 0 1 0 1.617h-3.144v3.14a.809.809 0 0 1-1.616 0v-3.14h-3.144a.808.808 0 1 1 0-1.617h3.144v-3.14c0-.447.362-.809.808-.809Z"
			clipRule="evenodd"
		/>
		<Path
			fill="#2964E0"
			d="M29.252 76.012h.816v1.944c0 .6-.076 1.188-.228 1.764a6.94 6.94 0 0 1-.624 1.62 6.374 6.374 0 0 1-.96 1.344 4.693 4.693 0 0 1-1.2.936l-.612-.804c.4-.2.768-.468 1.104-.804a5.914 5.914 0 0 0 1.488-2.568c.144-.496.216-.992.216-1.488v-1.944Zm.18 0h.804v1.944c0 .48.068.956.204 1.428.144.472.344.916.6 1.332.256.416.548.788.876 1.116a4.3 4.3 0 0 0 1.08.78l-.612.792a4.383 4.383 0 0 1-1.176-.888 6.706 6.706 0 0 1-.936-1.284 7.389 7.389 0 0 1-.624-1.56 6.863 6.863 0 0 1-.216-1.716v-1.944Zm4.512-.936h.996v10.86h-.996v-10.86Zm.768 4.392h2.004v.852h-2.004v-.852Zm5.411-3.204h.828v1.116c0 .664-.128 1.28-.384 1.848a4.633 4.633 0 0 1-1.08 1.5 4.554 4.554 0 0 1-1.596.96l-.516-.78c.544-.2 1.02-.476 1.428-.828.416-.352.74-.76.972-1.224.232-.472.348-.964.348-1.476v-1.116Zm.192 0h.816v1.116c0 .368.064.724.192 1.068.136.336.328.652.576.948.248.288.536.544.864.768.336.224.704.4 1.104.528l-.504.78a4.718 4.718 0 0 1-1.584-.912 4.45 4.45 0 0 1-1.08-1.416 4.09 4.09 0 0 1-.384-1.764v-1.116Zm-2.676-.288h5.94v.816h-5.94v-.816Zm7.488-.888h.996v7.944h-.996v-7.944Zm-5.976 9.792h7.308v.816h-7.308v-.816Zm0-2.592h.996v2.952h-.996v-2.952Zm16.663-5.22h3.12v.816h-3.12v-.816Zm0 2.34h3.144v.816h-3.144v-.816Zm2.748-4.32h.996v8.028h-.996v-8.028Zm-5.976 9.792h7.224v.816h-7.224v-.816Zm0-2.544h.996v2.952h-.996v-2.952Zm-1.428-6.528h.996v1.908h2.928v-1.908h.984v5.46h-4.908v-5.46Zm.996 2.688v1.968h2.928v-1.968h-2.928Zm14.303-1.416h2.904v.804h-2.904v-.804Zm-.096 2.256h2.928v.816h-2.928v-.816Zm2.832-4.248h.996v6.492h-.996v-6.492Zm-3.396.804h1.056c0 .928-.204 1.764-.612 2.508-.4.744-.98 1.384-1.74 1.92-.752.528-1.648.948-2.688 1.26l-.408-.792c.92-.272 1.708-.624 2.364-1.056.656-.44 1.156-.944 1.5-1.512a3.567 3.567 0 0 0 .528-1.896v-.432Zm-3.84 0h4.512v.816h-4.512v-.816Zm4.704 5.808c.736 0 1.368.084 1.896.252.536.168.952.408 1.248.72.296.312.444.684.444 1.116 0 .44-.148.816-.444 1.128-.296.304-.712.54-1.248.708-.528.176-1.16.264-1.896.264-.728 0-1.364-.088-1.908-.264-.536-.168-.952-.404-1.248-.708a1.58 1.58 0 0 1-.444-1.128c0-.432.148-.804.444-1.116.296-.312.712-.552 1.248-.72.544-.168 1.18-.252 1.908-.252Zm0 .792c-.528 0-.988.052-1.38.156-.392.104-.696.252-.912.444a.899.899 0 0 0-.324.696c0 .272.108.504.324.696.216.192.52.34.912.444.392.104.852.156 1.38.156.536 0 .996-.052 1.38-.156.384-.104.684-.252.9-.444a.899.899 0 0 0 .324-.696.899.899 0 0 0-.324-.696c-.216-.192-.516-.34-.9-.444-.384-.104-.844-.156-1.38-.156Z"
		/>
	</Svg>
);
export default IconProfileChange;
