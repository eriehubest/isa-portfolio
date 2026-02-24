import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const Geometry = ({ progress, ...props }) => {
    const meshRef = useRef(null);

    // useFrame(() => {
    //     const p = progress.current;
    //     meshRef.current.rotation.y = p * Math.PI * 2;
    // });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} rotation-y={Math.PI / 4}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial wireframe color={'black'} />
        </mesh>
    )
}