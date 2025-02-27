import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/Message';

function Facebook() {
    const [lines, setLines] = useState([]);
    const navigate = useNavigate();
    const { message } = useMessage();
    const [zoomedNode, setZoomedNode] = useState(null);

    const nodeData = {
        "Node__input": {
            nodeId: "input-node-1",
            type: "input",
            edgeId: "xy-edge__input-node-1-voyage-embed-node-2",
            source: "''",
            target: "voyage-embed-node-2"
        },
        "Node__output": {
            nodeId: "facebook-node-8",
            type: "org.maoz.prehandle.workers.neoai.notify.LineVerticle",
            edgeId: "xy-edge__to-publish-verticle-node-10-facebook-node-8",
            source: "facebook-node-8",
            target: "''"
        },
        "Node__embed": {
            nodeId: "voyage-embed-node-2",
            type: "org.maoz.prehandle.workers.neoai.aiclient.embedding.VoyageVerticle",
            edgeId: "xy-edge__voyage-embed-node-2-http-client-adapter-verticle-node-4",
            source: "voyage-embed-node-2",
            target: "http-client-adapter-verticle-node-4"
        },
        "Node__http": {
            nodeId: "http-client-adapter-verticle-node-4",
            type: "org.maoz.prehandle.workers.neoai.httpclient.HttpClientAdapterVerticle",
            edgeId: "xy-edge__http-client-adapter-verticle-node-4-voyage-transform-node-3",
            source: "http-client-adapter-verticle-node-4",
            target: "voyage-transform-node-3"
        },
        "Node__transform": {
            nodeId: "voyage-transform-node-3",
            type: "org.maoz.prehandle.workers.neoai.aiclient.embedding.util.VoyageTransformVerticle",
            edgeId: "xy-edge__voyage-transform-node-3-to-publish-verticle-node-10",
            source: "voyage-transform-node-3",
            target: "to-publish-verticle-node-10"
        },
        "Node__topublish": {
            nodeId: "to-publish-verticle-node-10",
            type: "org.maoz.prehandle.workers.neoai.ebtransform.ToPublishVerticle",
            edgeId: "xy-edge__to-publish-verticle-node-10-facebook-node-8",
            source: "to-publish-verticle-node-10",
            target: "facebook-node-8"
        },
    };

  useEffect(() => {
    const updateLines = () => {
      const positions = [
        "Node__input", 
        "Node__embed", 
        "Node__http", 
        "Node__transform", 
        "Node__topublish", 
        "Node__output"
      ]
      .map(id => {
        const el = document.querySelector(`.${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top - 20
          };
        }
        return null;
      })
      .filter(pos => pos !== null);

      const newLines = [];
      for (let i = 0; i < positions.length - 1; i++) {
        newLines.push({
          x1: positions[i].x,
          y1: positions[i].y,
          x2: positions[i + 1].x,
          y2: positions[i + 1].y
        });
      }
      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, []);

  const reset = () => {
    setLines([]);
    navigate('/');
  };

  return (
    <div className="Facebook">
        {/* Edge each node */}
        <svg className="Edge__svg">
            {lines.map((line, index) => (
            <line 
                key={index} 
                x1={line.x1} 
                y1={line.y1} 
                x2={line.x2} 
                y2={line.y2} 
            />
            ))}
        </svg>

        <div className="IO__container">
            {/* Node input */}
            <div className="Node__input">
                <div className="NodeHead__input">
                    Input
                    <img src="/images/zoom.png" alt="zoom" onClick={() => setZoomedNode(prev => prev?.nodeId === nodeData["Node__input"].nodeId ? null : nodeData["Node__input"])}/>
                </div>
                <div className="NodeBody">
                    {message}
                </div>
            </div>

            {/* Node output */}
            <div className="Node__output">
                <div className="NodeHead__facebook">
                    Facebook
                    <img src="/images/zoom.png" alt="zoom" onClick={() => setZoomedNode(prev => prev?.nodeId === nodeData["Node__output"].nodeId ? null : nodeData["Node__output"])} />
                </div>
                <div className="NodeBody">
                    {message}
                </div>
            </div>
        </div>

        <div className="Side__container">
            {/* Node embed */}
            <div className="Node__embed">
                <img src="/images/embed.png" alt="embed" />
                Embed
                <img src="/images/zoom.png" alt="zoom" onClick={() => setZoomedNode(prev => prev?.nodeId === nodeData["Node__embed"].nodeId ? null : nodeData["Node__embed"])} />
            </div>

            {/* Node http */}
            <div className="Node__http">
                <img src="/images/http.png" alt="http" />
                HTTP
                <img src="/images/zoom.png" alt="zoom" onClick={() => setZoomedNode(prev => prev?.nodeId === nodeData["Node__http"].nodeId ? null : nodeData["Node__http"])} />
            </div>

            {/* Node transform */}
            <div className="Node__transform">
                <img src="/images/transform.png" alt="transform" />
                Transform
                <img src="/images/zoom.png" alt="zoom" onClick={() => setZoomedNode(prev => prev?.nodeId === nodeData["Node__transform"].nodeId ? null : nodeData["Node__transform"])} />
            </div>

            {/* Node To publish */}
            <div className="Node__topublish">
                <img src="/images/publish.png" alt="publish" />
                To Publish
                <img src="/images/zoom.png" alt="zoom" onClick={() => setZoomedNode(prev => prev?.nodeId === nodeData["Node__topublish"].nodeId ? null : nodeData["Node__topublish"])}/>
            </div>
        </div>

        <div className="Button__container">
            <button className="Button__reset" onClick={reset}>Reset</button>
        </div>

        {/* Print node info */}
        {zoomedNode && (
            <div className="ZoomBox">
                <p><b>Node ID:</b> {zoomedNode.nodeId}</p>
                <p><b>Type:</b> {zoomedNode.type}</p>
                <p><b>Edge ID:</b> {zoomedNode.edgeId}</p>
                <p><b>Source:</b> {zoomedNode.source}</p>
                <p><b>Target:</b> {zoomedNode.target}</p>
            </div>
        )}
    </div>
  )
}

export default Facebook