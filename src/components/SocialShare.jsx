import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

const SocialShare = ({ url }) => (
  <div>
    <h6>share to:</h6>
    <FacebookShareButton url={url}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>

    <TwitterShareButton url={url}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>
  </div>
);

export default SocialShare;
