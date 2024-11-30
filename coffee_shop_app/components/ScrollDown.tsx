import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';

interface ScrollDownProps {
  dependency: any[]; // This is an array of dependencies that will trigger the scroll
}

const ScrollDown: React.FC<ScrollDownProps> = ({ dependency }) => {
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [dependency]); // Scroll whenever dependency changes

  return <ScrollView ref={scrollViewRef} style={{ flex: 1 }} />;
};

export default ScrollDown;
