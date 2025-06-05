export function BlankCardIcon() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-3/4 h-2 bg-white rounded" />
    </div>
  );
}

export function ImageAndTextIcon() {
  return (
    <div className="flex w-full h-full gap-2">
      <div className="w-1/2 bg-white rounded" />
      <div className="flex flex-col w-1/2 gap-1">
        <div className="w-full h-2 bg-white rounded" />
        <div className="w-2/3 h-2 bg-white rounded" />
      </div>
    </div>
  );
}

export function TextAndImageIcon() {
  return (
    <div className="flex w-full h-full gap-2">
      <div className="flex flex-col w-1/2 gap-1">
        <div className="w-full h-2 bg-white rounded" />
        <div className="w-2/3 h-2 bg-white rounded" />
      </div>
      <div className="w-1/2 bg-white rounded" />
    </div>
  );
}

export function TwoColumnsIcon() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
      <div className="w-full h-4 bg-white rounded" />
      <div className="flex w-full h-full gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="flex flex-col w-1/2 gap-1" key={i}>
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-2/3 h-2 bg-white rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThreeColumnsIcon() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
      <div className="w-full h-4 bg-white rounded" />
      <div className="flex w-full h-full gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div className="flex flex-col w-1/2 gap-1" key={i}>
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-2/3 h-2 bg-white rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FourColumnsIcon() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
      <div className="w-full h-4 bg-white rounded" />
      <div className="flex w-full h-full gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div className="flex flex-col w-1/2 gap-1" key={i}>
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-2/3 h-2 bg-white rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TwoColumnsWithHeadingsIcon() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
      <div className="w-full h-4 bg-white rounded" />
      <div className="flex w-full h-full gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="flex flex-col w-1/2 gap-1" key={i}>
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-2/3 h-1 bg-white rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThreeColumnsWithHeadingsIcon() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
      <div className="w-full h-4 bg-white rounded" />
      <div className="flex w-full h-full gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="flex flex-col w-1/2 gap-1" key={i}>
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-2/3 h-1 bg-white rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BulletsIcon() {
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <div className="w-3/4 h-3 mb-1 bg-gray-300 rounded" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="flex-1 h-2 bg-white rounded" />
        </div>
      ))}
    </div>
  );
}

export function TwoImageColumnsIcon() {
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <div className="w-full h-3 bg-white rounded" />
      <div className="flex items-center justify-center w-full h-8 bg-white rounded" />
      <div className="flex w-full h-full gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="flex flex-col w-1/2 gap-1" key={i}>
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-2/3 h-1 bg-white rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThreeImageColumnsIcon() {
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <div className="w-full h-3 bg-white rounded" />
      <div className="flex items-center justify-center w-full h-8 bg-white rounded" />
      <div className="flex w-full h-full gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div className="flex flex-col w-1/2 gap-1" key={i}>
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-2/3 h-1 bg-white rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FourImageColumnsIcon() {
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <div className="w-full h-3 bg-white rounded" />
      <div className="flex items-center justify-center w-full h-8 bg-white rounded" />
      <div className="flex w-full h-full gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div className="flex flex-col w-1/2 gap-1" key={i}>
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-full h-1 bg-white rounded" />
            <div className="w-2/3 h-1 bg-white rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
