import AbstractResearcher from "../../AbstractResearcher";

// All config
import firstWordExceptions from "./config/firstWordExceptions";
import functionWords from "./config/functionWords";
import transitionWords from "./config/transitionWords";
import twoPartTransitionWords from "./config/twoPartTransitionWords";
import syllables from "./config/syllables.json";
import fleschReadingEaseScores from "./config/fleschReadingEaseScores";
import sentenceLength from "./config/sentenceLength";

// All helpers
import getStemmer from "./helpers/getStemmer";
import isPassiveSentence from "./helpers/isPassiveSentence";
import fleschReadingScore from "./helpers/calculateFleschReadingScore";

/**
 * The researches contains all the researches
 */
export default class Researcher extends AbstractResearcher {
	/**
	 * Constructor
	 * @param {Paper} paper The Paper object that is needed within the researches.
	 * @constructor
	 */
	constructor( paper ) {
		super( paper );

		// Delete the researches that are not available for this language
		delete this.defaultResearches.stopWordsInKeyword;
		delete this.defaultResearches.stopWordsInUrl;


		Object.assign( this.config, {
			language: "ru",
			isPeriphrastic: false,
			firstWordExceptions,
			functionWords,
			transitionWords,
			twoPartTransitionWords,
			syllables,
			fleschReadingEaseScores,
			sentenceLength,
		} );

		Object.assign( this.helpers, {
			getStemmer,
			isPassiveSentence,
			fleschReadingScore,
		} );
	}
}
