import { inherits } from "util";

import KeyphraseLengthAssessment from "../assessments/seo/KeyphraseLengthAssessment";
import MetaDescriptionKeywordAssessment from "../assessments/seo/MetaDescriptionKeywordAssessment";
import TitleKeywordAssessment from "../assessments/seo/TitleKeywordAssessment";
import UrlKeywordAssessment from "../assessments/seo/UrlKeywordAssessment";
import Assessor from "../assessor";
import MetaDescriptionLength from "../assessments/seo/MetaDescriptionLengthAssessment";
import TitleWidth from "../assessments/seo/PageTitleWidthAssessment";
import FunctionWordsInKeyphrase from "../assessments/seo/FunctionWordsInKeyphraseAssessment";
/**
 * Creates the Assessor
 *
 * @param {object}  i18n            The i18n object used for translations.
 * @param {object}  researcher      The researcher to use for the analysis.
 * @param {Object}  options         The options for this assessor.
 * @param {Object}  options.marker  The marker to pass the list of marks to.
 *
 * @constructor
 */
const StoreBlogSEOAssessor = function( i18n, researcher, options ) {
	Assessor.call( this, i18n, researcher, options );
	this.type = "storeBlogSEOAssessor";

	this._assessments = [
		new KeyphraseLengthAssessment(),
		new MetaDescriptionKeywordAssessment(),
		new MetaDescriptionLength(),
		new TitleKeywordAssessment(),
		new TitleWidth( {
			scores: {
				widthTooShort: 9,
			},
		}, true ),
		new UrlKeywordAssessment(),
		new FunctionWordsInKeyphrase(),
	];
};

inherits( StoreBlogSEOAssessor, Assessor );

export default StoreBlogSEOAssessor;
