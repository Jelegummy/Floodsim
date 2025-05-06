/* eslint-disable @next/next/no-before-interactive-script-outside-document */
/* eslint-disable @next/next/no-css-tags */
'use client'

import { useEffect } from 'react'
import Script from 'next/script'

type PointCloudEvent = {
  pointcloud: {
    position: { z: number }
    material: {
      size: number
      pointSizeType: number
      activeAttributeName: string
    }
  }
}

export default function PorthreeExample() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.Potree &&
      window.Potree.Viewer
    ) {
      const viewer = new window.Potree.Viewer(
        document.getElementById('potree_render_area'),
      )
      viewer.setEDLEnabled(true)
      viewer.setFOV(60)
      viewer.setPointBudget(5_000_000)
      viewer.loadSettingsFromURL()
      viewer.setDescription(
        `Point cloud courtesy of PG&E and <a href="https://opentopography.org/">Open Topography</a>.`,
      )

      viewer.loadGUI().then(() => {
        viewer.setLanguage('en')
        viewer.toggleSidebar()
      })

      window.Potree.loadPointCloud(
        'http://5.9.65.151/mschuetz/potree/resources/pointclouds/opentopography/CA13_1.4/cloud.js',
        'CA13',
        (e: PointCloudEvent) => {
          viewer.scene.addPointCloud(e.pointcloud)
          e.pointcloud.position.z = 0

          const material = e.pointcloud.material
          material.size = 0.8
          material.pointSizeType = window.Potree.PointSizeType.ADAPTIVE
          material.activeAttributeName = 'rgba'

          viewer.scene.view.setView(
            [694517.403, 3899262.595, 10642.698],
            [694878.41, 3916332.067, 14.497],
          )
        },
      )
    }
  }, [])

  return (
    <>
      <link rel="stylesheet" href="/build/potree/potree.css" />
      <link rel="stylesheet" href="/libs/jquery-ui/jquery-ui.min.css" />
      <link rel="stylesheet" href="/libs/openlayers3/ol.css" />
      <link rel="stylesheet" href="/libs/spectrum/spectrum.css" />
      <link rel="stylesheet" href="/libs/jstree/themes/mixed/style.css" />

      <Script
        src="/libs/jquery/jquery-3.1.1.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/libs/jquery-ui/jquery-ui.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/libs/spectrum/spectrum.js" strategy="beforeInteractive" />
      <Script src="/libs/other/BinaryHeap.js" strategy="beforeInteractive" />
      <Script src="/libs/tween/tween.min.js" strategy="beforeInteractive" />
      <Script src="/libs/d3/d3.js" strategy="beforeInteractive" />
      <Script src="/libs/proj4/proj4.js" strategy="beforeInteractive" />
      <Script src="/libs/openlayers3/ol.js" strategy="beforeInteractive" />
      <Script src="/libs/i18next/i18next.js" strategy="beforeInteractive" />
      <Script src="/libs/jstree/jstree.js" strategy="beforeInteractive" />
      <Script src="/libs/plasio/js/laslaz.js" strategy="beforeInteractive" />
      <Script src="/libs/other/stats.js" strategy="beforeInteractive" />
      <Script src="/build/potree/potree.js" strategy="beforeInteractive" />

      <div
        className="potree_container"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        }}
      >
        <div
          id="potree_render_area"
          style={{
            backgroundImage:
              "url('/build/potree/resources/images/background.jpg')",
          }}
        ></div>
        <div id="potree_sidebar_container"></div>
      </div>
    </>
  )
}
