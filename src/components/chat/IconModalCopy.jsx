import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconModalCopy = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		fill="none"
		{...props}
	>
		<G fill="#AFB0B3" fillRule="evenodd" clipRule="evenodd">
			<Path d="M2.233 1.64c.49-.527 1.184-.816 1.987-.816h3.826c.708 0 1.332.223 1.808.64.474.416.767.994.868 1.648a.552.552 0 0 1-1.091.17c-.067-.433-.25-.765-.505-.988-.252-.221-.609-.366-1.08-.366H4.22c-.528 0-.918.184-1.18.464-.264.285-.436.713-.436 1.266v4.928c0 .505.144.905.369 1.186.222.276.548.468.984.522a.552.552 0 0 1-.136 1.096c-.706-.087-1.298-.415-1.709-.927C1.704 9.956 1.5 9.3 1.5 8.586V3.658c0-.782.246-1.495.733-2.018Z" />
			<Path d="M5.97 5.4c.49-.526 1.184-.814 1.987-.814h3.824c.805 0 1.5.288 1.99.814.486.523.73 1.235.73 2.017v4.928c0 .782-.244 1.494-.73 2.016-.491.527-1.186.815-1.99.815H7.956c-.805 0-1.5-.288-1.99-.815-.486-.522-.73-1.234-.73-2.016V7.417c0-.783.245-1.495.732-2.017Zm.807.753c-.265.284-.437.71-.437 1.264v4.928c0 .554.172.98.435 1.264.26.279.65.463 1.182.463h3.823c.533 0 .923-.184 1.182-.463.264-.283.435-.71.435-1.264V7.417c0-.554-.17-.981-.435-1.264-.26-.279-.649-.463-1.181-.463H7.957c-.53 0-.92.184-1.18.463Z" />
		</G>
	</Svg>
);

export default IconModalCopy;
