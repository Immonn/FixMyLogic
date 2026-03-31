export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
	inputArgs?: any[];
};

export type PistonLanguage = 'python' | 'cpp' | 'java';

export type PistonTestCases = {
	python?: string;
	cpp?: string;
	java?: string;
};

// local problem data
export type Problem = {
	id: string;
	title: string;
	problemStatement: string;
	examples: Example[];
	constraints: string;
	order: number;
	starterCode: string;
	handlerFunction: ((fn: any) => boolean) | string;
	starterFunctionName: string;
};

export type DBProblem = {
	id: string;
	title: string;
	category: string;
	difficulty: string;
	likes: number;
	dislikes: number;
	order: number;
	videoId?: string;
	link?: string;
};
