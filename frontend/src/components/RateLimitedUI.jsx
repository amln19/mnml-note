import { ZapIcon } from "lucide-react";
import { TriangleAlert } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-10 text-primary-content" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-row items-center gap-2 mb-2">
              <h3 className="text-xl font-bold">Rate Limit Reached</h3>
              <TriangleAlert className="size-5"/>
            </div>
            <p className="text-base-content mb-1">
              You've made too many requests in a short period of time. Please
              wait a moment.
            </p>
            <p className="text-sm text-base-content/70">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
