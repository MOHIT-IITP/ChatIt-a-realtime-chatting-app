export const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-pulse"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-message-circle-dashed-icon lucide-message-circle-dashed"
              >
                <path d="M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1" />
                <path d="M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1" />
                <path d="M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5" />
                <path d="M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1" />
                <path d="M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1" />
                <path d="M3.5 17.5 2 22l4.5-1.5" />
                <path d="M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5" />
                <path d="M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to ChatIt!</h2>
        <p className="text-base-content/60">
          Start conversation with friends and family .
        </p>
      </div>
    </div>
  );
};
